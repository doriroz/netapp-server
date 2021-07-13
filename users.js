const users = [
  {
    userID: 1,
    userName: "ifatroz",
    email: "ifat.roz@gmail.com",
    firstName: "Ifat",
    lastName: "Rozen",
    phone: "0546511491",
    country: "Israel",
    profilePic: "ifat.jpg",
  },
  {
    userID: 2,
    userName: "igaltar",
    email: "igal.tar@gmail.com",
    firstName: "Igal",
    lastName: "Tar",
    phone: "0508281347",
    country: "Israel",
    profilePic: "igal.jpg",
  },
  {
    userID: 3,
    userName: "dorir",
    email: "doriroz@gmail.com",
    firstName: "Dori",
    lastName: "Rozen",
    phone: "054635925",
    country: "Israel",
    profilePic: "dori.jpg",
  },
  {
    userID: 4,
    userName: "shirib",
    email: "shiribar@gmail.com",
    firstName: "Shiri",
    lastName: "Bar-On",
    phone: "0544575335",
    country: "Israel",
    profilePic: "shiri.jpg",
  },
];

function getAll(req, res) {
  res.json(users);
}

function getUserbyid(req, res) {
  let user = users.find((u) => u.userID === parseInt(req.params.id));
  console.log(user);
  if (user) {
    // user = JSON.stringify(user);
    res.json(user);
  } else {
    res
      .status(404)
      .send("There was a error occured. try to check id existance");
  }
}

function getUserbyid(req, res) {
  let user = users.find((u) => u.userID === parseInt(req.params.id));
  console.log(user);
  if (user) {
    // user = JSON.stringify(user);
    res.json(user);
  } else {
    res
      .status(404)
      .send("There was a error occured. try to check id existance");
  }
}

function postUser(req, res) {
  let newUserID = users.length + 1;
  let newUser = {
    userID: newUserID,
    userName: req.body.userName,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    country: req.body.country,
    profilePic: req.body.profilePic,
  };
  users.push(newUser);
  res.json(users);
}

function putUser(req, res) {
  let user = users.find((u) => u.userID === parseInt(req.params.id));
  console.log(user);
  if (user) {
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    user.country = req.body.country;
    user.profilePic = req.body.profilePic;
    res.json(user);
  } else {
    res.status(404).send("There was an erroe");
  }
}

function deleteUser(req, res) {
  let user = users.find((u) => u.userID === parseInt(req.params.id));
  let ind = users.indexOf(user);
  console.log(ind);
  if (ind) {
    users.splice(ind, 1);
    // res.send(`user ${req.params.id} was deleted`);
    res.send(user);
  } else {
    res.status(404).send(`user was not found`);
  }
}

module.exports.getAll = getAll;
module.exports.getUserbyid = getUserbyid;
module.exports.postUser = postUser;
module.exports.putUser = putUser;
module.exports.deleteUser = deleteUser;
