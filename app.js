const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
var corsOptions = {
  origin: [
    "http://localhost:3000",
  ]
};
app.use(cors(corsOptions));
app.use(express.json());

const fs = require("fs");

app.get("/questions", (req, res) => {
  fs.readFile("questions.json", "utf8", (err, data) => {
    if (err) throw err;
    const questions = JSON.parse(data);
    res.json(questions);
  });
});

app.get("/conclusions", (req, res) => {
  fs.readFile("conclusions.json", "utf8", (err, data) => {
    if (err) throw err;
    const conclusions = JSON.parse(data);
    res.json(conclusions);
  });
});

app.post("/questions", (req, res) => {
  fs.readFile('questions.json', 'utf8', (err, data) => {
    if (err) throw err;
    const questions = JSON.parse(data);
    questions.push(req.body);
    fs.writeFile('questions.json', JSON.stringify(questions), (err) => {
      if (err) throw err;
      res.send(questions);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
