import nodemailer from 'nodemailer'
import asyncHandler from 'express-async-handler'

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASS,
    },
  })

  const info = await transporter.sendMail({
    from: '"Hey " Star Gadgets', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  })

  //   console.log('Message sent: %s', info.messageId)
})

export default sendEmail
