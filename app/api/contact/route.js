import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Validate the incoming data to ensure required fields exist
    if (!name || !phone || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send the email using the Resend API
    const data = await resend.emails.send({
      from: 'noreply@vivexatech.in',
      to: 'contact@vivexatech.in',
      subject: `New Contact Form - ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">New Contact Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Subject:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 10px; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    // Return success response back to the client
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}