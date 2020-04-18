const express = require('express');
const app = express();
const cron = require("node-cron");
const bodyParser = require('body-parser');
let nodemailer = require("nodemailer");


require('dotenv/config');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//--------------------------------------------------
app.get('/',(req,res,next)=>{
    res.sendFile((__dirname +"/index.html"));
});
//--------------------------------------------------

//--------------------------------------------------
app.get('/index.js',(req,res,next)=>{
    res.sendFile((__dirname +"/index.js"));
});
//--------------------------------------------------

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass
  }
});


app.post('/job',(req,res,next)=>{
    a=req.body.a
    b=req.body.b
    c=req.body.c
    d=req.body.d
    e=req.body.e
    f=req.body.f

    sub=req.body.sub
    text=req.body.text
    receiver=req.body.receiver

    cron.schedule(`${a} ${b} ${c} ${d} ${e} ${f}`, function(){
      let mailOptions = {
        from: process.env.user,
        to: receiver,
        subject: `${sub}`,
        text: `${text}`
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          throw error;
        } else {
          console.log("Email successfully sent!");
        }
      });
    });

  // app.use(express.static(__dirname +"/index.html"));  
  // res.sendFile((__dirname +"/index.html"));

  res.status(200).json({
    status:"email sent successfully"
  });
});

module.exports =app;
