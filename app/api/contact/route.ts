import { Resend } from 'resend';

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not set');
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: Request) {
  try {
    const { name, email, projectType, budget, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await getResend().emails.send({
      from: 'MH-TOHA Portfolio <onboarding@resend.dev>',
      to: ['connect.mhtoha@gmail.com'],
      subject: `[Portfolio] ${projectType || 'Inquiry'} from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project Type: ${projectType || 'Not specified'}`,
        `Budget: ${budget || 'Not specified'}`,
        ``,
        `Message:`,
        message,
      ].join('\n'),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
