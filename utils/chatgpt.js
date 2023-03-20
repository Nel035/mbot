const { Configuration, OpenAIApi } = require("openai");
const history = require("./history");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (api, message, body) => {
  try {
    const recentMsg = await history(api, message);
    const allMsg = [...recentMsg, {role: "user", content: body}];
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: allMsg,
    });
    const completion_text = completion.data.choices[0].message.content;
    return { isError: "false", message: completion_text };
  } catch (e) {
    console.log(e)
    return { isError: "true", message: "Error, salik yawa." };
  }
};
