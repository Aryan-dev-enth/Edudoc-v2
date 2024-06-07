import emailjs from "@emailjs/browser";

export const sendEmail = (form, recipientEmail, messageContent) => {
  const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const public_key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  return new Promise((resolve, reject) => {
    emailjs
      .send(
        service_id,
        template_id,
        {
          from_name: form.name,
          to_name: recipientEmail,
          from_email: form.email,
          message: messageContent,
          to_email: recipientEmail
        },
        public_key
      )
      .then((response) => {
        console.log("EmailJS Response:", response); 
        resolve("Thank you, I will get back to you soon!");
      })
      .catch((error) => {
        console.error(error);
        reject("Something went wrong! Try again later");
      });
  });
};