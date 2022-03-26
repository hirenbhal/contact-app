const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
// const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = (accountSid, authToken);

app.use(cors());

app.get('/',(req,res) => {
    res.send("Express Server!!");
})

app.get('/send-otp',(req,res) => {
    const {receiver,textMessage} = req.query
    client.messages.create({
        body: textMessage,
        from: "+17409964473",
        to: receiver,
    })
    .then((message) => console.log(message.body))
})


// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   twiml.message('The Robots are coming! Head for the hills!');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });




app.listen(4000,() => {
    console.log("Server is running on Port 4000");
})