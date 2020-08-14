var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/thanks', function(req, res, next) {
  res.render('thanks', { title: 'Thanks' });
});

router.post("/contact", function(req, res){
  async function main(){

    // need to authenticate EMAIL and get clientID, Secret, and Refresh token when adding a new email
    //  using OAuth specifications found on Google's developer platform
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId:"\n" + process.env.CLIENTID + "\n" ,
        clientSecret: "\n" + process.env.CLIENTSECRET + "\n" ,
        refreshToken: process.env.REFRESHTOKEN
      }
    });

    // setup email data
    let mailOptions = {
      from: "Kyle's Portfolio Site",
      to: process.env.EMAIL,
      subject: "Message from Kyle's Portfolio Site", // Subject line
      text:"Subject:\n" + req.body.subject + "\n\n Message: \n" + req.body.message + "\n\nTo reply to this inquiry, please send response to the user's email:\n" +
          req.body.email // plain text body

    };
    console.log(req.body);

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log(req.body);
  }

  main().catch(console.error);
  res.redirect("/thanks");
});

module.exports = router;
