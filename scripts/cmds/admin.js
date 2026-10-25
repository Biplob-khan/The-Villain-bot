module.exports = {
  config: {
    name: "admin",
    aliases: ["owner", "botadmin"],
    version: "1.0.0",
    credits: "YourName",
    description: "Shows bot and owner information automatically when someone types admin",
    usages: "admin",
    cooldown: 5
  },

  // ১. প্রিফিক্স দিয়ে কমান্ড চালালে কাজ করবে (যেমন: .admin)
  run: async function({ api, event, args }) {
    const { threadID, messageID } = event;
    return sendAdminInfo(api, threadID, messageID);
  },

  // ২. গ্রুপে কেউ সরাসরি 'admin' লিখলেই অটো কাজ করবে (কোনো প্রিফিক্স ছাড়া)
  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    
    // যদি মেসেজ না থাকে বা বটের নিজের মেসেজ হয়, তবে রিটার্ন করবে
    if (!body) return;

    // ব্যবহারকারী যদি শুধু 'admin' বা বড় হাতের 'Admin' লেখে
    const text = body.toLowerCase().trim();
    if (text === "admin") {
      return sendAdminInfo(api, threadID, messageID);
    }
  }
};

// মেসেজ পাঠানোর ফাংশন আলাদা করে রাখা হলো যাতে উভয় জায়গায় ব্যবহার করা যায়
function sendAdminInfo(api, threadID, messageID) {
  const adminInfoText = 
    `🤖 ──── [ BOT & OWNER INFO ] ──── 👑\n\n` +
    `🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : 𝗬𝘂𝗧𝗮 6𝗧9\n` +
    `👑 𝗢𝘄𝗻𝗲𝗿 : 𝗩𝗶𝗹𝗹𝗮𝗶𝗻 𝗕𝗶𝗽𝗹𝗼𝗯\n` +
    `🏡 𝗗𝗶𝘀𝘁𝗿𝗶𝗰𝘁 : 𝗦𝗶𝗿𝗮𝗷𝗴𝗮𝗻𝗷\n` +
    `🆔 𝗔𝗱𝗺𝗶𝗻 𝘂𝗶𝗱 : 𝗩𝗶𝗹𝗲𝗻𝗯𝗶𝗽𝗹𝗼𝗯007\n` +
    `🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : https://facebook.com/𝗩𝗶𝗹𝗲𝗻𝗯𝗶𝗽𝗹𝗼𝗯007\n\n` +
    `📝 𝗕𝗶𝗼 : "Love is Name Sex Is game!💋💥"\n\n` +
    `✨ Contact the owner for any bot-related issues or inquiries!`;

  return api.sendMessage(adminInfoText, threadID, messageID);
}
