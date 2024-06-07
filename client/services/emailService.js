import emailjs from "@emailjs/browser";

export const sendEmail = (form, recipientEmail, messageContent) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  return new Promise((resolve, reject) => {
    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: "Edudoc",
          to_name: recipientEmail,
          from_email: form.email,
          message: messageContent,
          to_email: recipientEmail
        },
        publicKey
      )
      .then((response) => {
        resolve("Thank you, I will get back to you soon!");
      })
      .catch((error) => {
        console.log("EmailJS Error:", error);
        reject("Something went wrong! Try again later");
      });
  });
};
