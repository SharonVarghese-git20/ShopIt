import nodemailer from 'nodemailer'

const sendEmail=async(options)=>{
    const transport = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth: {
          user:process.env.SMTP_EMAIL,
          pass:process.env.SMTP_PASSWORD,
        },
       /* var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "744902d625f04e",
            pass: "2b1e3f81e34337"
          }
            var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "744902d625f04e",
    pass: "2b1e3f81e34337"
  }
});
        });*/
      });

    const message={
        from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        html:options.message,
    };
    
    await transport.sendMail(message);
};

export default sendEmail;