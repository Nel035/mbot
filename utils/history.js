function retrieveMsgs(api, message){
  return new Promise(resolve => {
    api.getThreadHistory(message.threadID, 10, undefined, (err, history) => {
      if(err) return console.error(err);
      const newHistory = history.map(i => {
        return {role: "user", content: i.body};
      });
      resolve([{
        role: "assistant",
        content: `You are Xyst Lee, a messenger bot created by Arnel Cutie. You answer as concisely as possible for each responseIf you are generating a list, do not have too many items.
    Current Date and Time: ${new Date().toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    })}\n\n`,
      }, ...newHistory]);
  });
  });
}

module.exports = retrieveMsgs;