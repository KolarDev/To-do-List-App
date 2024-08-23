const nodemailer = require("nodemailer");


// Email template adapted from https://github.com/leemunroe/responsive-html-email-template
// Converted from HTML using https://html2pug.now.sh/


module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.url = url;
        this.from = `kolardev <${process.env.EMAIL_FROM}>`;
        this.userName = user.name.split(" ")[0];
        
    }

    newTransport() {

        if (process.env.NODE_ENV === 'production') {
            // Sendgrid
            return nodemailer.createTransport({
              service: 'SendGrid',
              auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
              }
            });
        }
        
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port:  process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
            
        });
    }

    async send(message, subject) {
        
        mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: message
        }

        await newTransport().sendMail(mailOptions);
    }

    
}