import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName, fatherName, email, phone,
      dob, gender, course, qualification,
      address, message, token,
    } = body;

    if (!fullName?.trim() || !phone?.trim() || !course?.trim() || !token) {
      return NextResponse.json({ error: 'Full name, phone, course, and verification are required.' }, { status: 400 });
    }

    if (!RECAPTCHA_SECRET_KEY) {
      return NextResponse.json({ error: 'Server configuration error: reCAPTCHA is not configured.' }, { status: 503 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service is not configured. Please call us directly.' }, { status: 503 });
    }

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 });
    }

    const instituteEmail = process.env.INSTITUTE_EMAIL || 'contact@vivexatech.in';

    await resend.emails.send({
      from: 'noreply@vivexatech.in',
      to: instituteEmail,
      subject: `New Admission Enquiry: ${fullName} — ${course}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1e293b;">
          <div style="background-color: #2563eb; padding: 20px; border-radius: 8px 8px 0 0; color: white;">
            <h2 style="margin: 0;">New Online Admission Request</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Course: ${course}</p>
          </div>
          <div style="padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <h3>Personal Details</h3>
            <p><strong>Student Name:</strong> ${fullName}</p>
            <p><strong>Father's Name:</strong> ${fatherName || '—'}</p>
            <p><strong>Date of Birth:</strong> ${dob || '—'}</p>
            <p><strong>Gender:</strong> ${gender || '—'}</p>
            <h3>Contact</h3>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Address:</strong> ${address || '—'}</p>
            <h3>Academic</h3>
            <p><strong>Course:</strong> ${course}</p>
            <p><strong>Qualification:</strong> ${qualification || '—'}</p>
            ${message ? `<h3>Message</h3><p>${message}</p>` : ''}
            <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Verified by reCAPTCHA (score: ${verifyData.score})</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Your admission enquiry was submitted successfully.' });
  } catch (error) {
    console.error('Admission Form Error:', error);
    return NextResponse.json({ error: 'Failed to send your enquiry. Please try again or call us directly.' }, { status: 500 });
  }
}
