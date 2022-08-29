const express = require('express');
const bodyParser = require('body-parser');
const testData = require('./TestData.json')
const getRandomWords = require('./helpers').getRandomWords

const app = express()

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/words', (req, res) => {
  // we make a copy as we shouldn't edit the main list
  const wordListCopy = testData.wordList.slice()
  const chosenWords = getRandomWords(wordListCopy, 10)

  if (!chosenWords) {
    res.status(500).json({
      "error": "List count is lower than the required words count."
    })
  } else {
    res.status(200).json(chosenWords)
  }
})

app.post('/rank', (req, res) => {
  if (isNaN(req.body.score) || req.body.score > 100 || req.body.score < 0) {
    res.status(400).json({
      "error": "Please enter a valid exam score"
    })
  }

  const scoresListCopy = testData.scoresList.slice()
  const scoresBelow = scoresListCopy.reduce((curr, next) => next < req.body.score ? curr + 1 : curr, 0);
  const finalRank = (scoresBelow * 100) / scoresListCopy.length

  res.status(200).json({
    'rank': finalRank.toFixed(2)
  })
})

// Start the server
const PORT = 4001
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))