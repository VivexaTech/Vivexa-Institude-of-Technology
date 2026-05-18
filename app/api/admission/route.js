import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/firebase';
import { collection, doc, runTransaction, serverTimestamp, addDoc } from 'firebase/firestore';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      fullName, fatherName, email, phone, 
      dob, gender, course, qualification, 
      address, message, token 
    } = body;

    // 1. Basic Validation Check
    if (!fullName || !fatherName || !phone || !dob || !gender || !course || !qualification || !address || !token) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Verify Google reCAPTCHA v3 Token
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const verifyRes = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const verifyData = await verifyRes.json();

    // Block spam: A score below 0.5 is usually considered a bot.
    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Spam activity suspected.' },
        { status: 400 }
      );
    }

    // 3. Dispatch Email via Resend
    await resend.emails.send({
      from: 'noreply@vivexatech.in',
      to: 'contact@vivexatech.in', // Adjust this destination email as necessary
      subject: `New Admission Form: ${fullName} - ${course}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1e293b;">
          <div style="background-color: #2563eb; padding: 20px; border-radius: 8px 8px 0 0; color: white;">
            <h2 style="margin: 0;">New Online Admission Request</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Course: ${course}</p>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Personal Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 150px; color: #64748b;"><strong>Student Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Father's Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${fatherName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Date of Birth:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${dob}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Gender:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; text-transform: capitalize;">${gender}</td>
              </tr>
            </table>

            <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Contact & Address</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 150px; color: #64748b;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  ${email ? `<a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>` : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Full Address:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${address}</td>
              </tr>
            </table>

            <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Academic Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 150px; color: #64748b;"><strong>Course Selected:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #2563eb;">${course}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Qualification:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${qualification}</td>
              </tr>
            </table>

            ${message ? `
            <div style="margin-top: 20px;">
              <h3 style="color: #0f172a; margin-bottom: 10px;">Additional Message:</h3>
              <p style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            ` : ''}
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #94a3b8; text-align: center;">
              <p>Form submission verified by Google reCAPTCHA v3 (Trust Score: ${verifyData.score})</p>
            </div>
          </div>
        </div>
      `,
    });

    // 4. Save to Firebase Firestore with Auto-Incrementing ID
    try {
      const currentYear = new Date().getFullYear();
      const counterRef = doc(db, 'counters', 'admissions');

      const admissionId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);

        let newCount = 1;
        if (counterDoc.exists()) {
          const data = counterDoc.data();
          if (data.year === currentYear) {
            newCount = data.count + 1;
          }
        }

        const formattedId = `VIT-ADM-${currentYear}-${String(newCount).padStart(3, '0')}`;

        transaction.set(counterRef, {
          year: currentYear,
          count: newCount
        });

        return formattedId;
      });

      await addDoc(collection(db, 'admissions'), {
        admissionId: admissionId,
        fullName,
        fatherName,
        email: email || '', // Might not be provided based on previous code
        phone,
        dob,
        gender,
        course,
        qualification,
        address,
        message: message || '',
        status: "Pending",
        source: "Website Admission Form",
        createdAt: serverTimestamp()
      });
    } catch (dbError) {
      console.error('Failed to save admission to Firestore:', dbError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Admission Form Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}