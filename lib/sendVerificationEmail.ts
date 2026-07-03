import { Resend } from "resend";

export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.resend_api_key);

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verifyEmail?token=${token}`;

  const { error } = await resend.emails.send({
    from: "noreply@bhaskarthakulla.com.np",
    to: email,
    subject: "Verify Your Email",
    html: `
      <h2>Welcome!</h2>

      <p>Thanks for signing up.</p>

      <p>Please verify your email by clicking the button below.</p>

      <a
        href="${verifyUrl}"
        target="_blank" rel="noopener noreferrer"
        style="
          display:inline-block;
          padding:12px 20px;
          background:#2563eb;
          color:#fff;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Verify Email
      </a>

      <p>This link expires in 2 minutes.</p>
    `,
  });
  if (error) {
    throw new Error(error.message);
  }
};
