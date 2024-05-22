const nodemailer = require("nodemailer")
//Mail initialization
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "vladstrelnykov@gmail.com",
      pass: "GrushAdmin0829!@#", 
    },
});

const transferMail = async function main(from, to, subject, text, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html
  });
  console.log("Message sent: %s", info.messageId);
}


const currentDateTime = () => {
  
  var currentdate = new Date(); 
  var datetime = (currentdate.getMonth()+1)  + "/" 
                + (currentdate.getDate())  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes()

  return datetime;
}

module.exports= {
  transporter,
  transferMail,
  currentDateTime
}


