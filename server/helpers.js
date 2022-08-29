const getRandomWords = (list, numOfWords = 10) => {
  if (list.length < numOfWords) return

  // get all unique POS values from the current words list
  const AVAILABLE_POS_IN_LIST = [...new Set(list.map(word => word.pos))]
  let occurrencesPerPos = {}, // will track occurrence of each pos
    chosenWords = []

  // initialize all pos to 0 to start tracking occurrences
  AVAILABLE_POS_IN_LIST.forEach(pos => occurrencesPerPos[pos] = 0)

  while (chosenWords.length < numOfWords) {
    let randomWordIdx = Math.floor((Math.random() * list.length));

    // this condition is to ensure that all pos occurred at least once
    if (chosenWords.length > AVAILABLE_POS_IN_LIST.length
      && Object.values(occurrencesPerPos).some(pos => pos === 0)
      && occurrencesPerPos[list[randomWordIdx]['pos']] !== 0) {
      continue
    }

    chosenWords.push(list[randomWordIdx])
    occurrencesPerPos[list[randomWordIdx]['pos']]++
    list.splice(randomWordIdx, 1)
  }
  return chosenWords
}

module.exports = {getRandomWords}