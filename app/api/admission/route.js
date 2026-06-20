import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      fatherName,
      email,
      phone,
      dob,
      gender,
      course,
      qualification,
      address,
      message,
      token,
    } = body;

    if (!fullName?.trim() || !phone?.trim() || !course?.trim() || !token) {
      return NextResponse.json(
        { error: 'Full name, phone, course, and verification are required.' },
        { status: 400 }
      );
    }

    if (!RECAPTCHA_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error: reCAPTCHA is not configured.' },
        { status: 503 }
      );
    }

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const verifyRes = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    const enquiryData = {
      fullName: fullName.trim(),
      email: (email || '').trim(),
      phone: phone.trim(),
      course: course.trim(),
      message: (message || '').trim(),
      fatherName: (fatherName || '').trim(),
      qualification: (qualification || '').trim(),
      address: (address || '').trim(),
      dob: (dob || '').trim(),
      gender: (gender || '').trim(),
      status: 'New',
      source: 'Website Admission Form',
      createdAt: serverTimestamp(),
    };

    const emailPromise = resend.emails.send({
      from: 'noreply@vivexatech.in',
      to: 'contact@vivexatech.in',
      subject: `New Admission Enquiry: ${fullName} - ${course}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1e293b;">
          <h2 style="color: #2563eb;">New Website Admission Enquiry</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Course:</strong> ${course}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        </div>
      `,
    });

    let docRef;
    try {
      docRef = await addDoc(collection(db, 'admission_enquiries'), enquiryData);
    } catch (dbError) {
      console.error('Admission enquiry Firestore save failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to save your enquiry. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    try {
      await emailPromise;
    } catch (emailError) {
      console.error('Admission enquiry email failed:', emailError);
      // Enquiry is saved — do not fail the user-facing response
    }

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Your admission enquiry was submitted successfully.',
    });
  } catch (error) {
    console.error('Admission Form Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
