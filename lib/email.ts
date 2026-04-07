import { Resend } from "resend";

type DownloadEmailPayload = {
  customerEmail: string;
  projectName: string;
  downloadUrl: string;
  repoUrl: string;
  amountLabel: string;
};

let resendClient: Resend | null = null;

export function isDownloadEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.DOWNLOAD_EMAIL_FROM);
}

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
  }

  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

export async function sendDownloadEmail({
  customerEmail,
  projectName,
  downloadUrl,
  repoUrl,
  amountLabel,
}: DownloadEmailPayload) {
  if (!process.env.DOWNLOAD_EMAIL_FROM) {
    throw new Error("Missing DOWNLOAD_EMAIL_FROM");
  }

  const resend = getResendClient();

  await resend.emails.send({
    from: process.env.DOWNLOAD_EMAIL_FROM,
    to: customerEmail,
    subject: `${projectName} download link`,
    text: [
      `Thanks for supporting ${projectName}.`,
      "",
      `Amount: ${amountLabel}`,
      `Download: ${downloadUrl}`,
      `Public repository: ${repoUrl}`,
      "",
      "This project is open source, so the public release remains available on GitHub as well.",
    ].join("\n"),
  });
}
