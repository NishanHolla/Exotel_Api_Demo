var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var axios = require("axios");

const api_token = 'e0f391e95c6268fd7224a12e0018790d694f746568715628';
const api_key = '471e6c0621aeca7137cf011fdcc9900c5c1fa0322087154a';
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
    let api = `https://${api_token}:${api_key}${subdomain}/v1/Accounts/${sid}/Sms/send`;    
    let dataString = `From=${sendPhone}&To=${phn}&Body=Hello World!&ShortenUrl=true&ShortenUrlParams[Tracking]=true&ShortenUrlParams[ClickTrackingCallbackUrl]=https://www.google.co.in/`;
    // sendOtp(api,dataString);
    res.json({"message":[api,dataString]})
})

app.listen(3000,()=>{console.log("Exotel OTP is online and running")});