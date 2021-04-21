import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

const sendEmail = async (email: string, subject: string, payload: any, template: string) => {
    try {
      console.log('sendEmail')
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const source = fs.readFileSync(path.join(__dirname, template), "utf8");
      const compiledTemplate = handlebars.compile(source);
      const options = () => {
        return {
          from: process.env.FROM_EMAIL,
          to: email,
          subject: subject,
          html: compiledTemplate(payload),
        };
      };
  
      // Send email
      transporter.sendMail(options(), (error: any, info:any) => {
        if (error) {
            console.log(error);
          return error;
        } else {
          console.log("ok");
        }
      });
    } catch (error) {
        console.log(error);
      return error;
    }
  };

  export default sendEmail;
  