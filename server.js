var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var axios = require("axios");
require('dotenv').config()

const subdomain = 'api.exotel.com';
const sendPhone = '8951621998';

app.use(bodyParser.json())

function sendOtp(api,dataString){
    axios.post(api,dataString)
    .then((response)=>{
        console.log('Respone',response.data);
    })
    .catch((error)=>{
        console.error("Error",error.message);
    })
}

app.post('/sendOtp',(req,res)=>{
    let sid = req.body.Sid;
    let phn = req.body.phn;
    let api = `https://${process.env.APITOKEN}:${process.env.APIKEY}${subdomain}/v1/Accounts/${sid}/Sms/send`;    
    let dataString = `From=${sendPhone}&To=${phn}&Body=Hello World!&ShortenUrl=true&ShortenUrlParams[Tracking]=true&ShortenUrlParams[ClickTrackingCallbackUrl]=https://www.google.co.in/`;
    // sendOtp(api,dataString);
    console.log(process.env.PORT);
    res.json({"message":[api,dataString]})
})

app.listen(3000,()=>{console.log("Exotel OTP is online and running")});