const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  context: { type: String, required: true },
  picText: String,
  date: { type: Date, default: Date.now },
});

//export schema
module.exports.messageSchema = messageSchema;

//create the class for message
//connect the collection in DB and the Schema
let Message = mongoose.model("Message", messageSchema);

function getAll(req, res) {
  Message.find()
    .populate("author", "userName firstName lastName")
    .then((msg) => res.json(msg));
}

function getMessageByID(req, res) {
  Message.findById(req.params.id)
    .populate("author", "userName firstName lastName")
    .then((msg) => {
      if (msg) {
        res.json(msg);
      } else {
        res
          .status(404)
          .send("There was an error.try an check if message id exists");
      }
    });
}

function getMessageByChat(req, res) {
  Message.find({ chat: req.params.id })
    .populate("author", "userName firstName lastName")
    .then((msg) => res.json(msg));
}

function createMessage(req, res) {
  let message = new Message({
    author: req.body.author,
    chat: req.body.chat,
    context: req.body.context,
    picText: req.body.picText,
    date: req.body.date,
  });

  message
    .save()
    .then((msg) => res.status(201).json(msg))
    .catch((err) =>
      res.status(500).send("There was an internal error occured" + err)
    );
}

function updateMessage(req, res) {
  Message.findById(req.params.id).then((message) => {
    if (message) {
      message.author = req.body.author;
      message.chat = req.body.chat;
      message.context = req.body.context;
      message.picText = req.body.picText;
      message.date = req.body.date;
      message
        .save()
        .then((msg) => res.json(msg))
        .catch((err) =>
          res.status(500).send("There was an internal error " + err)
        );
    } else {
      res.status(404).send("Couldn't find a message to update");
    }
  });
}

function removeMessage(req, res) {
  Message.findByIdAndRemove(req.params.id)
    .then((msg) => {
      if (msg) {
        res.json(msg);
      } else {
        res.status(404).send("Couldn't find message to remove");
      }
    })
    .catch((err) => res.status(500).send("There was an internal error " + err));
}

module.exports.getAll = getAll;
module.exports.getMessageByID = getMessageByID;
module.exports.getMessageByChat = getMessageByChat;
module.exports.createMessage = createMessage;
module.exports.updateMessage = updateMessage;
module.exports.removeMessage = removeMessage;

// This is the structure for insert new message in Postman
// {
//   "author":"60c2523497fb4f41c011ad1b"
//   "chat":"60ddfbd4a079c047c46b7a8e",
//   "context": "dedeewfwelif  fwefwe",
//   "picText": "yotam.jpg"
// }
