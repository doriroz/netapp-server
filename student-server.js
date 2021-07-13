const express = require("express");
let students = [
  {
    id: 1,
    name: "Jeff",
    age: "32",
    city: "LA",
  },
  {
    id: 2,
    name: "Matt",
    age: "23",
    city: "NY",
  },
  {
    id: 3,
    name: "Louis",
    age: "45",
    city: "Boston",
  },
];
// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.listen(8000, () => console.log("Our server is listening on port 8000... ")); // Now we're live!
// handle request to 'home page'
app.get("/", (req, res) => {
  res.write("<h1>Welcome to our student server!</h1>"); // writing the response
  res.write("<p>I want to study NodeJS</p>");
  res.end(); // sending the response

  //res.send() is shorten way for write() && end()
});

app.get("/student", (req, res) => {
  res.json(students);
});

app.get("/student/:id", (req, res) => {
  let student = students.find((s) => s.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).send("Sorry. There is no student like the one you picked");
  }
});

app.post("/student", (req, res) => {
  let newID = students[students.length - 1].id + 1;
  let newStudent = {
    id: newID,
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
  };

  students.push(newStudent);
  //   res.json(newStudent);
  res.status(201).json(newStudent);
});

app.put("/student/:id", (req, res) => {
  let student = students.find((s) => s.id === parseInt(req.params.id));
  console.log(student);
  if (student) {
    student.name = req.body.name && req.body.name;
    student.age = req.body.age && req.body.age;
    student.city = req.body.city && req.body.city;

    console.log(student);
    res.json(student);
  } else {
    res.status(404).send("Sorry. There is no student like the one you picked");
  }
});

app.delete("/student/:id", (req, res) => {
  let student = students.find((s) => s.id === parseInt(req.params.id));
  if (student) {
    let ind = students.indexOf(student);
    students.splice(ind, 1);
    res.json(student);
  } else {
    res.status(404).send("Sorry. There is no student like the one you picked");
  }
});
