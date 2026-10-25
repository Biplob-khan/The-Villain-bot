module.exports = {
  config: {
    name: "admin",
    aliases: ["owner", "botadmin"],
    version: "1.0.0",
    credits: "YourName",
    description: "Shows bot and owner information",
    usages: "admin",
    cooldown: 5
  },

  run: async function({ api, event }) {
    const { threadID, messageID } = event;

    // আপনার দেওয়া ডিজাইন ও তথ্য
    const adminInfoText = 
      `🤖 ──── [ BOT & OWNER INFO ] ──── 👑\n\n` +
      `🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : 𝗬𝘂𝗧𝗮 6𝗧9\n` +
      `👑 𝗢𝘄𝗻𝗲𝗿 : 𝗩𝗶𝗹𝗹𝗮𝗶𝗻 𝗕𝗶𝗽𝗹𝗼𝗯\n` +
      `🏡 𝗗𝗶𝘀𝘁𝗿𝗶𝗰𝘁 : 𝗦𝗶𝗿𝗮𝗷𝗴𝗮𝗻𝗷\n` +
      `🆔 𝗔𝗱𝗺𝗶𝗻 𝘂𝗶𝗱 : 𝗩𝗶𝗹𝗲𝗻𝗯𝗶𝗽𝗹𝗼𝗯007\n` +
      `🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : https://facebook.com/𝗩𝗶𝗹𝗲𝗻𝗯𝗶𝗽𝗹𝗼𝗯007\n\n` +
      `📝 𝗕𝗶𝗼 : "Love is Name Sex Is game!💋💥"\n\n` +
      `✨ Contact the owner for any bot-related issues or inquiries!`;

    // মেসেজ পাঠানো
    return api.sendMessage(adminInfoText, threadID, messageID);
  }
};
