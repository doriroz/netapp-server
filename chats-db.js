const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

//export the schema
module.exports.chatSchema = chatSchema;

//create class object for chats
let Chat = mongoose.model("Chat", chatSchema);

function getAll(req, res) {
  Chat.find()
    // .populate("userIds", "userName")
    .then((data) => res.json(data));
}

function getById(req, res) {
  Chat.findById(req.params.id)
    // .populate("userIds", "userName")
    .then((chat) => {
      if (chat) {
        res.json(chat);
      } else {
        res.status(404).send("Can't find ChatID");
      }
    });
}

function getFriends(req, res) {
  Chat.find({ userIds: req.params.id })
    .populate("userIds", "userName")
    .then((chat) => res.json(chat));
}

function creatChat(req, res) {
  let chat = new Chat({
    userIds: req.body.userIds,
  });

  chat
    .save()
    .then((ch) => res.status(201).json(ch))
    .catch((err) => {
      console.log(err);
      res.status(500).send("There was an internal error " + err);
    });
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.createChat = creatChat;
module.exports.getFriends = getFriends;
// This is the structure for insert new chat in Postman
// {
//   "userIds":[
//       {"_id":"60c2523497fb4f41c011ad1a"},
//       {"_id":"60c2523497fb4f41c011ad1b"}
//   ]
// }
