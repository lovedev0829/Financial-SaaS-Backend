const nodemailer = require("nodemailer")
//Mail initialization
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

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
  currentDateTime
}


