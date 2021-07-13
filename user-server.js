const express = require("express");
const { send } = require("process");
const users = require("./users");
const app = express();

app.use(express.json());
app.listen(8000, () => console.log("User Server is up"));

app.get("/api/", (req, res) => res.send("dori"));
app.get("/api/users", users.getAll);

app.get("/users/:id", users.getUserbyid);

app.post("/users", users.postUser);

app.put("/users/:id", users.putUser);

app.delete("/users/:id", users.deleteUser);
