const sendGridMail = require('@sendgrid/mail')
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

const transferMail = async (from, to, subject, text, html) => {
  const msg = {
    to: to, // Change to your recipient
    from: from, // Change to your verified sender
    subject: subject,
    text: text,
    html: html // Add HTML content if available
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
  currentDateTime
}


