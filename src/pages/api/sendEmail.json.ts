import { Resend } from "resend";
import type { APIRoute } from "astro";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  const { to, from, html, subject, text } = body;

  if (!to || !from || !html || !subject || !text) {
    return new Response(
      JSON.stringify({
        message: "Invalid request data. Please provide all required fields.",
      }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
  });

  if (error) {
    console.error({ error });
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: data || "Email sent successfully.",
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
};
