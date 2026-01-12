import { text } from "express";
import mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Project Managment Tool ",
      link: "https://projectmanagment.com",
    },
  });
  const emailTextual = mailGenerator.generatePlaintext(options.mailGenContent);
  const emailHTML = mailGenerator.generate(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAILTRAP_SMTP_HOST,
    port: process.env.EMAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.EMAILTRAP_SMTP_USERNAME,
      pass: process.env.EMAILTRAP_SMTP_PASSWORD,
    },
  });

  const mail = {
    from: "testmail.@projectmanagment.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (err) {
    console.error("Email service failed ", err);
  }
};

const emailVerificationMailGen = (userName, verificationURL) => {
  return {
    body: {
      name: userName,
      intro: "Welcome to Mailgen! We\'re very excited to have you on board.",
      action: {
        instructions: `For verification, please click below botton:`,
        button: {
          color: "#22BC66",
          text: `verify your Email`,
          link: verificationURL,
        },
      },
      outro: `Need help, or have questions? Just reply to this email, we\'d love to help.`,
    },
  };
};

const forgotPasswordMailGen = (userName, verificationURL) => {
  return {
    body: {
      name: userName,
      intro:
        "you have received this email because a password reset request for you account was received.",
      action: {
        instructions: `Click the button to reset youyr password`,
        button: {
          color: "#22BC66",
          text: `Reset your Password`,
          link: verificationURL,
        },
      },
      outro: `If you did not request a password reset. no further action is required at your end.`,
    },
  };
};

export { emailVerificationMailGen, forgotPasswordMailGen, sendEmail };
