import nodemailer from "nodemailer";

export async function post({ request }) {
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
    from: data.email, // avsändarens email (från formuläret)
    to: process.env.EMAIL_TO,
    subject: `Kontaktformulär: ${data.service}`,
    text: `
      Namn: ${data.name}
      Telefon: ${data.phone}
      E-post: ${data.email}
      Tjänst: ${data.service}
      Meddelande: ${data.message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
