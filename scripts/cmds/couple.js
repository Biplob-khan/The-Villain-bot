module.exports = {
  config: {
    name: "couple",
    aliases: ["jodi", "match", "coupleoftheday"],
    version: "1.0.0",
    credits: "Villain Biplob",
    description: "Matches a random couple in the group chat with funny and romantic vibes",
    usages: "couple",
    cooldown: 5
  },

  run: async function({ api, event }) {
    const { threadID, messageID } = event;

    try {
      // ১. গ্রুপ বা থ্রেডের মেম্বারদের ইনফো ফেচ করা
      const threadInfo = await api.getThreadInfo(threadID);
      const participantIDs = threadInfo.participantIDs;

      // বটের নিজস্ব আইডি বা ফাঁকা আইডি বাদ দেওয়া
      const validMembers = participantIDs.filter(id => id !== api.getCurrentUserID());

      if (validMembers.length < 2) {
        return api.sendMessage("গ্রুপে অন্তত দুজন মেম্বার না থাকলে কাপল ম্যাচিং করা সম্ভব নয়! 😅", threadID, messageID);
      }

      // ২. রেন্ডমলি দুজন ভিন্ন মেম্বার সিলেক্ট করা
      const firstIndex = Math.floor(Math.random() * validMembers.length);
      let secondIndex;
      do {
        secondIndex = Math.floor(Math.random() * validMembers.length);
      } while (firstIndex === secondIndex);

      const userID1 = validMembers[firstIndex];
      const userID2 = validMembers[secondIndex];

      // ৩. ইউজারদের নাম বের করা
      let name1 = "বন্ধু ১";
      let name2 = "বন্ধু ২";
      try {
        const userInfo = await api.getUserInfo([userID1, userID2]);
        name1 = userInfo[userID1]?.name || "বন্ধু ১";
        name2 = userInfo[userID2]?.name || "বন্ধু ইউন";
      } catch (e) {}

      // ৪. আকর্ষণীয় ও ফানি লাভ ম্যাচিং মেসেজ তৈরি
      const matchQuotes = [
        "একি দেখPছি! নিয়তি যেন এদের কপালেই লিখে রেখেছিল! একদম পারফেক্ট জুটি! 💖✨",
        "ঘটক Villain Biplob এর স্পেশাল এপ্রুভালে আজকের সেরা কাপল ঘোষণা করা হলো! 🎉",
        "সাক্ষী Yuta নিজ চোখে দেখে এই জুটিকে গ্রিন সিগন্যাল দিয়ে দিয়েছে! 💍🌹",
        "ভাগ্যের কী দারুণ খেলা! এদের দুজনকে একসাথে দেখলে কার না হিংসা হয় বলো? 🥰"
      ];
      const randomQuote = matchQuotes[Math.floor(Math.random() * matchQuotes.length)];

      const messageBody = 
        `💞 ─── [ GROUP COUPLE MATCHING ] ─── 💞\n\n` +
        `🤵‍♂️ @${name1}\n` +
        `       ✨   ❤️   ✨\n` +
        `👰‍♀️ @${name2}\n\n` +
        `💌 ${randomQuote}\n\n` +
        `👑 ঘটক: Villain Biplob\n` +
        `🛡️ সাক্ষী: Yuta`;

      const mentions = [
        { tag: `@${name1}`, id: userID1 },
        { tag: `@${name2}`, id: userID2 }
      ];

      return api.sendMessage({
        body: messageBody,
        mentions: mentions
      }, threadID, messageID);

    } catch (error) {
      console.error("Couple Command Error:", error);
      return api.sendMessage("দুঃখিত, কাপল ম্যাচিং করতে গিয়ে একটু সমস্যা হয়েছে! পরে আবার চেষ্টা করুন। 😢", threadID, messageID);
    }
  }
};
