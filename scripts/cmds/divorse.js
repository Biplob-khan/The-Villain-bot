const axios = require("axios");

module.exports = {
  config: {
    name: "divorce",
    aliases: ["talak", "breakup"],
    version: "1.0.0",
    credits: "Villain Biplob",
    description: "Fun sad divorce script with video attached",
    usages: "divorce @mention",
    cooldown: 5
  },

  run: async function({ api, event, args }) {
    const { threadID, messageID, mentions } = event;
    const mentionedIDs = Object.keys(mentions);

    // ১. মেনশন চেক করা
    if (mentionedIDs.length === 0) {
      return api.sendMessage("⚠️ কাকে ডিভোর্স দিতে চান তার নাম মেনশন করুন! যেমন: divorce @Friend", threadID, messageID);
    }

    const partnerID = mentionedIDs[0];
    const partnerName = mentions[partnerID].replace("@", "");

    // ২. স্যাড ডিভোর্স টেক্সট
    const divorceText = 
      `💔 ─── [ অফিশিয়াল তালাকনামা ] ─── ⚖️\n\n` +
      `ব্রেকিং নিউজ! দাম্পত্য কলহের জেরে @${partnerName} এর সাথে আপনার বিচ্ছেদ ঘটেছে!\n\n` +
      `🤵‍♂️ ঘটক : 𝗩𝗶𝗹𝗹𝗮𝗶𝗻 𝗕𝗶𝗽𝗹𝗼𝗯\n` +
      `🤝 সাক্ষী : 𝗬𝘂𝘁𝗮\n\n` +
      `আজ থেকে আপনারা সম্পূর্ণ আলাদা! মন খারাপ করবেন না, জীবন তো একটাই... 🥺🥀`;

    const mentionData = [{
      tag: `@${partnerName}`,
      id: partnerID
    }];

    try {
      // ৩. স্যাড ডিভোর্স ভিডিওর ডিরেক্ট লিংক (এখানে আপনার পছন্দের স্যাড ভিডিও লিংক বসাতে পারেন)
      const videoUrl = "https://i.imgur.com/3Z3Q83a.mp4"; // স্যাম্পল স্যাড ভিডিও লিংক
      const videoStream = (await axios.get(videoUrl, { responseType: "stream" })).data;

      return api.sendMessage({
        body: divorceText,
        mentions: mentionData,
        attachment: videoStream
      }, threadID, messageID);

    } catch (error) {
      console.error("Divorce Video Error:", error);
      // ভিডিও লোড না হলে শুধু টেক্সট পাঠাবে
      return api.sendMessage({
        body: divorceText,
        mentions: mentionData
      }, threadID, messageID);
    }
  }
};
