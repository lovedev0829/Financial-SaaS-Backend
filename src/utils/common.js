const sendGridMail = require('@sendgrid/mail')
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)
var fs = require('fs');

const transferMail = async (from, to, subject, text) => {
  const msg = {
    to: to, // Change to your recipient
    from: from, // Change to your verified sender
    subject: subject,
    text: text
  };

  try {
    await sendGridMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('Error response:', error.response.body);
    }
  }
};

const removeFile = (filePath) => {

  if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
          if (err) {
              console.log(err);
          }
      })
  }
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
  transferMail,
  currentDateTime,
  removeFile
}


