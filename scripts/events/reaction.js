module.exports = {
  config: {
    name: "reactionReply",
    eventType: ["message_reaction"],
    version: "1.0.0",
    credits: "Yuta biplob",
    description: "Reacts and replies based on the user's reaction to bot's message"
  },

  run: async function({ api, event }) {
    const { threadID, userID, reaction, messageID, authorID } = event;
    const botID = api.getCurrentUserID();

    // ১. রিঅ্যাক্টটি কি বটের নিজের মেসেজে দেওয়া হয়েছে? (যদি অন্য কারো মেসেজে হয়, তবে কাজ করবে না)
    // (যদি সবার মেসেজের জন্য করতে চান, তবে authorID === botID শর্তটি সরিয়ে দিতে পারেন)
    if (authorID !== botID) return;

    // ২. যে ইউজার রিঅ্যাক্ট দিয়েছে তার নাম ফেচ করা (মেনশন দেওয়ার জন্য)
    let userInfo;
    try {
        userInfo = await api.getUserInfo(userID);
    } catch (e) {
        userInfo = {};
    }
    let name = userInfo[userID]?.name || "বন্ধু";

    // ৩. কোন ইমোজি দিয়ে রিঅ্যাক্ট করা হয়েছে তার ওপর ভিত্তি করে রেসপন্স তৈরি করা
    let replyMessage = "";

    switch (reaction) {
        case "❤️":
        case "😍":
            replyMessage = `অসংখ্য ধন্যবাদ @${name}! ভালোবাসার জন্য অনেক আদর রইলো! ❤️`;
            break;
        case "😂":
        case "😆":
            replyMessage = `হেসে উড়িয়ে দিচ্ছেন @${name}? কৌতুকটা কি বেশি funny ছিল নাকি? 😆`;
            break;
        case "👍":
        case "👌":
            replyMessage = `সায় দেওয়ার জন্য ধন্যবাদ, @${name}! 😎`;
            break;
        case "😢":
        case "😭":
            replyMessage = `আরে @${name}, কান্নাকাটি কেন করছেন? মন খারাপ থাকলে বলুন, সলভ করে দিচ্ছি! 🥺`;
            break;
        case "😡":
        case "😠":
            replyMessage = `উফ! এত রেগে যাচ্ছেন কেন @${name}? কুল ডাউন! 🧊`;
            break;
        case "😮":
        case "😲":
            replyMessage = `অবাক হয়ে গেলেন নাকি @${name}? চোখ কপালে ওঠার মতো কী দেখলাম? 😲`;
            break;
        default:
            replyMessage = `আপনার '${reaction}' রিঅ্যাক্টটি পেয়ে গেলাম, @${name}! 👍`;
            break;
    }

    // ৪. মেনশন ট্যাগ সেট করা (ফেইসবুক চ্যাটে সুন্দরভাবে মেনশন দেওয়ার নিয়ম)
    let mentions = [{
        tag: `@${name}`,
        id: userID
    }];

    // ৫. মেসেজ পাঠানো
    api.sendMessage({
        body: replyMessage,
        mentions: mentions
    }, threadID, messageID);
  }
};
