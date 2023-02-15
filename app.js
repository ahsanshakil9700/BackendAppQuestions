const express = require("express");
const cors = require("cors");
const app = express();
const port = 3003;
var corsOptions = {
  origin: [
    "http://localhost:3000",
  ]
};
app.use(cors(corsOptions));
app.use(express.json());

const fs = require("fs");
const { type } = require("os");

app.use((req, res, next) => {
  try {
    const questionsRaw = fs.readFileSync("questions.json", { encoding: 'utf8', flag: 'r' })
    const questions = JSON.parse(questionsRaw)
    req.questions = questions
  } catch (error) { 
    next(error)
  }

  try {
    const conclusionsRaw = fs.readFileSync("conclusions.json", { encoding: 'utf-8', flag: 'r' })
    const conclusions = JSON.parse(conclusionsRaw)
    req.conclusions = conclusions
  }

  catch (error) {
    next(error)
  }

  next()
})


app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).send('Something went wrong')
})

app.post('/questions', (req, res) => {
  const { questionId, answer, context, initialState } = req.body
  const { questions, conclusions } = req

  if (initialState) {
    return res.send(questions[0])
  }

  const question = questions.find(q => q.id === questionId);
  if (!question) {
    return res.status(404).send({ error: 'question not found' });
  }

  const nextQuestionId = question.answers[answer].question_id;
  const nextQuestion = questions.find(q => q.id === nextQuestionId);
  if (!nextQuestion) {
    const conclusion = conclusions.find(c => {
      return context.every((contextItem) => c.context.includes(contextItem))
    });
    return res.send({ conclusion: conclusion ? conclusion.conclusion : "Not found" })
  }
  else {
    return res.send({ question: nextQuestion })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});