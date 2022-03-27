const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.use(cors());
const Message = require("./models/messageList");

const DB =
  "mongodb+srv://hirenbhal:hiren123456bhal@cluster0.ekgss.mongodb.net/contact-app?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected!!");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Express Server!!");
});

app.get("/send", (req, res) => {
  const { receiver, textMessage } = req.query;

  let { name, otp } = req.headers;

  client.messages
    .create({
      body: textMessage,
      from: "+17409964473",
      to: `+91${receiver}`,
    })
    .then((message) => {
      let date = message.dateCreated;
      let messageBody = message.body;

      const newMessage = new Message({ name, otp, messageBody, date });
      newMessage
        .save()
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.get("/message-list", (req, res) => {

  Message.find()
    .then((response) =>{
        res.status(200).json(response);
    })
    .catch((err) => console.log(err));

    
});

app.listen(4000, () => {
  console.log("Server is running on Port 4000");
});
