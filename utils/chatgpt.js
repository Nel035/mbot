const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (message) => {
  try {
    const messages = [
      {
        role: "assistant",
        content: `You are Xyst Lee, a messenger bot created by Arnel Cutie. You answer as concisely as possible for each responseIf you are generating a list, do not have too many items.
    Current Date and Time: ${new Date().toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    })}\n\n`,
      },
      {
        role: "user",
        content: message,
      },
    ];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: messages,
    }, {timeout: 30000});
    const completion_text = completion.data.choices[0].message.content;
    return { isError: "false", message: completion_text };
  } catch (e) {
    console.log(e)
    return { isError: "true", message: "Error found!, Lachica sadboi😭" };
  }
};
