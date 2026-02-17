import nodemailer from "nodemailer";

export async function POST({ request }) {
  const data = await request.json();

  const transporter = nodemailer.createTransport({
    host: "mailcluster.loopia.se",
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { ciphers: "SSLv3" },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // ✅ must be your email domain
    to: process.env.EMAIL_TO,
    subject: `Kontaktformulär: ${data.service}`,
    text: `
      Namn: ${data.name}
      Telefon: ${data.phone}
      E-post: ${data.email}
      Tjänst: ${data.service}
      Meddelande: ${data.message}
    `,
    replyTo: data.email, // ✅ reply goes to the customer
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
