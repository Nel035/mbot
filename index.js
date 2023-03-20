const express = require("express");
const app = express();
const chatgpt = require("./utils/chatgpt");
const login = require("fb-chat-api");
require("dotenv").config();

login({ appState: JSON.parse(process.env.FB_STATE) }, (err, api) => {
  if (err) return console.error(err);

  try {
    api.listenMqtt(async (err, message) => {
      if (err) throw err;

      if (message.type === "message") {
        let body = message.body;
        const isMentioned =
          message?.mentions["100090210600341"] === "@Xyst Lee";
          
        if (body.startsWith("@Xyst Lee") && isMentioned) {
          body = body.replace("@Xyst Lee", "").trim();
          const end = api.sendTypingIndicator(message.threadID);
          const reply = await chatgpt(body);
          end();
          api.sendMessage({ body: reply.message }, message.threadID);
        }
        
        if (message.senderID === "100030415156660" && !message.isGroup) {
          const end = api.sendTypingIndicator(message.threadID);
          const reply = await chatgpt(body);
          end();
          api.sendMessage({ body: reply.message}, message.threadID);
        }
      }
    });
  } catch (e) {
    return api.sendMessage("Error, Salik yawa", message.threadID);
  }
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("App is running on port 3000.");
});
