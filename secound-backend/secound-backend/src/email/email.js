import { createTransport } from "nodemailer";
import jwt from "jsonwebtoken";
import { emailTemp } from "./email.template.js";

async function sendMessageEmail(email) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "mohamedyasiiin1.p@gmail.com",
      pass: "oepz anrc tflb quvc",
    },
  });
  let token = jwt.sign({ email: email }, "secemail");

  const info = await transporter.sendMail({
    from: '"BlaBla👻" <mohamedyassin1.p@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Verify Your Account", // Subject line
    text: "text", // plain text body
    html: emailTemp(token, email), // html body
  });
  console.log("Message sent: %s", info.messageId);
}

export { sendMessageEmail };
