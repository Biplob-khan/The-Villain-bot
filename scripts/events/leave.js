module.exports = {
  config: {
    name: "antiLeave",
    eventType: ["log:unsubscribe"],
    version: "1.0.0",
    credits: "YourName",
    description: "Automatically re-adds users who leave the group"
  },

  run: async function({ api, event }) {
    // যে ইউজার লিভ নিয়েছে তার ID
    const leftParticipantId = event.logMessageData.leftParticipantFbId;
    const threadID = event.threadID;
    const botID = api.getCurrentUserID();

    // যদি বট নিজে লিভ নেয়, তবে কিছু করার দরকার নেই
    if (leftParticipantId === botID) return;

    try {
        // সাথে সাথে আবার গ্রুপে অ্যাড করা
        await api.addUserToGroup(leftParticipantId, threadID);

        // কাঙ্ক্ষিত মেসেজ পাঠানো
        api.sendMessage("আমি Yuta থাকতে কেউ পালাতে পারবে না 👽", threadID);
    } catch (error) {
        console.error("Failed to re-add user:", error);
    }
  }
};
