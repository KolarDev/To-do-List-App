const nodemailer = require("nodemailer");
const ejs = require("ejs");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url, task) {
    this.to = user.email;
    this.url = url;
    this.user = user;
    this.task = task;
    this.from = `Todo <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: process.env.BREVO_PORT,
      auth: {
        user: process.env.BREVO_USERNAME,
        pass: process.env.BREVO_PASSWORD,
      },
    });
  }

  async send(text, subject) {
    // const html = await ejs.renderFile(
    //   `${__dirname}/../views/emails/${template}.ejs`,
    //   {
    //     user: this.user,
    //     url: this.url,
    //     subject,
    //     task: this.task,
    //   }
    // );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      //   html,
      text,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to KolPay");
  }

  async deadlineAlert() {
    await this.send("deadlinenotify", "Welcome to Our Todo List App");
  }
};
