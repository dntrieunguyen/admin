'use strict';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendMail = async ({ email, html }) => {
   try {
      let transporter = nodemailer.createTransport({
         service: process.env.EMAIL_SERVICE,
         host: process.env.EMAIL_HOST,
         port: process.env.EMAIL_PORT,
         secure: false,
         auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
         },
      });

      // async..await is not allowed in global scope, must use a wrapper
      // send mail with defined transport object

      let info = await transporter.sendMail({
         from: '<no-reply@gmail.com>', // sender address
         to: email, // list of receivers
         subject: 'Thông báo khoá tài khoản', // Subject line
         html: html, // html body
      });

      //   console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      //
      // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
      //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
      //       <https://github.com/forwardemail/preview-email>
      //
      return info;
   } catch (error) {
      throw new Error(error);
   }
};

export { sendMail };
