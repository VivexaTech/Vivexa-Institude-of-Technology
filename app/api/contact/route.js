import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message, token } = body;

    // 1. Validate incoming form fields
    if (!name || !phone || !email || !subject || !message || !token) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Verify reCAPTCHA token with Google
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const verifyRes = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const verifyData = await verifyRes.json();

    // v3 returns a score (0.0 to 1.0). < 0.5 is typically considered a bot.
    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Bot suspected.' },
        { status: 400 }
      );
    }

    // 3 & 4. Execute Email and Database operations in parallel
    const emailPromise = resend.emails.send({
      from: 'noreply@vivexatech.in',
      to: 'contact@vivexatech.in',
      subject: `New Contact Form - ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">New Contact Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 120px;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Subject:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 30px; font-size: 12px; color: #64748b; text-align: center;">
            <p>Verified securely by Google reCAPTCHA v3 (Score: ${verifyData.score})</p>
          </div>
        </div>
      `,
    });

    const dbPromise = addDoc(collection(db, 'contact_messages'), {
      fullName: name,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
      source: "Website Contact Form",
      status: "Unread",
      createdAt: serverTimestamp()
    });

    const startTime = Date.now();
    Promise.allSettled([emailPromise, dbPromise]).then(([emailResult, dbResult]) => {
      const duration = Date.now() - startTime;
      console.log(`Contact APIs execution time: ${duration}ms`);

      if (emailResult.status === 'rejected') {
        console.error('Contact Form Email sending failed:', emailResult.reason);
      } else {
        console.log('Contact Form Email sent successfully.');
      }

      if (dbResult.status === 'rejected') {
        console.error('Contact Form Firebase save failed:', dbResult.reason);
      } else {
        console.log('Contact Form Firebase save successful.');
      }
    });

    // Return success instantly, without waiting for the email or database to finish
    return NextResponse.json({ success: true, message: "Form submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error('Contact Form/reCAPTCHA Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}