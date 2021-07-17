const express = require("express");
const mongoose = require("mongoose");
const users = require("./users-db");
const messages = require("./messages-db");
const chats = require("./chats-db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

//all app.use is called middleware
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://netapp-client-doriroz.herokuapp.com",
    credentials: true,
  })
);

app.use(cookieParser());

const urlToMongo =
  "mongodb+srv://doriroz:matrix34@cluster0.rjpf6.mongodb.net/netApp";

app.use(express.json()); //this make it to proccess json request

app.listen(process.env.PORT || 8080, () => console.log("Server is up"));
// app.listen(8080, () => console.log("Server is up"));

mongoose
  .connect(urlToMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //driver for mongoose
  })
  .then(console.log("ServerDb is connected"))
  .catch((err) => console.log(err.reason));

//Users Routing
app.get("/api/users", users.getAll);

app.get("/api/users/:id", users.getUserbyIdPrm);

app.get("/api/me", users.getLoggedUserByCookie);

app.post("/api/users", users.postUser);

app.put("/api/users/:id", users.putUser);

app.delete("api/users/:id", users.deleteUser);

//Message Routing
app.get("/api/messages", messages.getAll);

app.get("/api/messages/:id", messages.getMessageByID);

app.put("/api/messages/:id", messages.updateMessage);

app.delete("/api/messages/:id", messages.removeMessage);

//Chat Routing
app.get("/api/chats", chats.getAll);

app.get("/api/chats/:id", chats.getById);

app.post("/api/chats", chats.createChat);

app.get("/api/friends/:id", chats.getFriends);

app.get("/api/chats/:id/messages", messages.getMessageByChat);

app.post("/api/chats/:id/messages", messages.createMessage);
