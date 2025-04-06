import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'PantryWatch <onboarding@resend.dev>',
      to,
      subject,
      html,
      reply_to: 'pantrywatch@gmail.com'
    });
    return data;
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
}