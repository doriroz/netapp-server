const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  country: String,
  profilePic: String,
});

//export the schema
module.exports.userSchema = userSchema;

//model is a function use to create a class to work with the db
let User = mongoose.model("User", userSchema);

function getAll(req, res) {
  let regExp = new RegExp(req.body.search, "i");
  let filter = {};
  if (req.body.search) {
    filter = { $or: [{ firstName: regExp, lastName: regExp }] };
    // 2) filter = { firstName: regExp };
    // 1) filter = { firstName: req.body.search };
  }

  User.find(filter).then((result) => res.json(result));
}

function getUserbyIdPrm(req, res) {
  getUserbyid(req.params.id, res);
}

function getLoggedUserByCookie(req, res) {
  getUserbyid(req.cookies.userId, res);
}

function getUserbyid(userId, res) {
  User.findById(userId).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .send("There was a error occured. try to check id existance");
    }
  });
}

function postUser(req, res) {
  let user = new User({
    userName: req.body.userName,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    country: req.body.country,
    profilePic: req.body.profilePic,
  });

  user
    .save()
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal error " + err);
    });
}

function putUser(req, res) {
  User.findById(req.params.id).then((user) => {
    if (user) {
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.phone = req.body.phone;
      user.country = req.body.country;
      user.profilePic = req.body.profilePic;

      // res.json(user);
      user
        .save()
        .then((u) => {
          res.json(u);
        })
        .catch((err) => res.status(500).send("Internal error " + err));
    } else {
      res
        .status(404)
        .send("user " + req.params.id + " can not be found and updated");
    }
  });
}

function deleteUser(req, res) {
  User.findByIdAndRemove(req.params.id)
    .then((u) => {
      if (u) {
        res.send(u);
      } else {
        res
          .status(404)
          .send("user " + req.params.id + " can not be found and deleted");
      }
    })
    .catch((err) => res.status(500).send("Internal error " + err));
}

module.exports.getAll = getAll;
module.exports.getUserbyIdPrm = getUserbyIdPrm;
module.exports.postUser = postUser;
module.exports.putUser = putUser;
module.exports.deleteUser = deleteUser;
module.exports.getLoggedUserByCookie = getLoggedUserByCookie;
//This is the structure for insert new user in Postman
// {
//   userName: yaliroz,
//   email: yaliroz@gmail.com,
//   firstName: Yali,
//   lastName: Rozen,
//   phone: 0586511491,
//   country: Israel,
//   profilePic: yali.jpg,
// }
