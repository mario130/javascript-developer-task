const express = require('express');
const bodyParser = require('body-parser');
const wordList = require('./TestData.json').wordList
const getRandomWords = require('./helpers').getRandomWords

const app = express()

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/words', (req, res) => {
  // we make a copy as we shouldn't edit the main list
  const wordListCopy = wordList.slice()
  const chosenWords = getRandomWords(wordListCopy, 10)

  if (!chosenWords) {
    res.status(500).json({
      "error": "List count is lower than the required words count."
    })
  } else {
    res.status(200).json(chosenWords)
  }
})


// Start the server
const PORT = 4001
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))