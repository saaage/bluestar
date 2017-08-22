// API that allows user to perform decryption actions on a given text
import _ from 'lodash'
import plain from './plain.txt'

export default class CipherDecrypter {
  constructor(encrypted = "") {
    this.base = plain.toUpperCase()
    this.encrypted = encrypted
    this.quadgramStats = this.getQuadgramStats()
  }

  // utility function that removes whitespace and numbers from a string
  static compress(string){
    let noSpaces = string.match(/\w/g).join("").toUpperCase()
    return noSpaces.match(/\D/g).join("").toUpperCase()
  }

  // utility function that extracts all quadgrams from a text
  static extractQuadgrams(text) {
    let qArray = []

    text = CipherDecrypter.compress(text)

    for(let i = 0; i < text.length - 3; i++) {
      let q = text.substring(i, i + 4)
      qArray.push(q)
    }

    return qArray
  }

  // utility function that replaces character at a given index
  static replaceAt(string, replacement, pos) {
    return `${string.substr(0, pos)}${replacement}${string.substr(pos + replacement.length)}`
  }

  // a function to find the most used character which has a strong chance of
  //   being our key for 'E'
  findE() {
    let text = CipherDecrypter.compress(this.encrypted)

    let alphaCount = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0,
                  'H': 0, 'I': 0, 'J': 0, 'K': 0, 'L': 0, 'M': 0, 'N': 0,
                  'O': 0, 'P': 0, 'Q': 0, 'R': 0, 'S': 0, 'T': 0, 'U': 0,
                  'V': 0, 'W': 0, 'X': 0, 'Y': 0, 'Z': 0}

    // for every character in text increment alphabet count by 1
    for(let i = 0; i < text.length; i++) {
      alphaCount[text[i]] += 1
    }

    // check alphaCount for highest value
    let getMax = (obj) => {
      return Math.max.apply(null, Object.values(obj))
    }

    // store highest value into a variable
    let highestCount = getMax(alphaCount)

    // grab the key that contains the highest value
    const likelyE = Object.keys(alphaCount).find(key => alphaCount[key] ===
      highestCount)

    return likelyE
  }

  // Returns quadgram stats as an object (derived from this.base)
  getQuadgramStats() {
    let allQuadgrams = []
    let sampleText = ''
    let totalQuadgramCount = 0
    let quadgramStats = {}

    // Take a large sample of this.base, store in 'sampleText'
    for(let i = 0; i < this.base.length; i++) {
      sampleText = sampleText + this.base[i]
    }

    // remove numbers and whitespace from text
    sampleText = CipherDecrypter.compress(sampleText)

    allQuadgrams = CipherDecrypter.extractQuadgrams(sampleText)

    // load quadgramStats with quadgrams and their count
    quadgramStats = _.countBy(allQuadgrams)

    // update totalQuadgramCount
    for(let q in quadgramStats){
      totalQuadgramCount += quadgramStats[q] // pull occurences, add to sum
    }

    // function that allows us to sort an object by its' values (returns array)
    let sortByProperty = (obj) =>
    {
    	let sortable=[]

    	for(let key in obj)
    		if(obj.hasOwnProperty(key))
    			sortable.push([key, obj[key]])

    	sortable.sort(function(a, b)
    	{
    	  return b[1]-a[1]
    	})

    	return sortable
    }

    // sort quadgramStats by count (recall sortByProperty returns an array)
    quadgramStats = sortByProperty(quadgramStats)

    // calculate probability for each quadgram, replace count with probability
    quadgramStats.forEach((element) => {
      let probability = Math.log(element[1]/totalQuadgramCount)/Math.log(10)
      element.push(probability)
      element.splice(1,1)
    })

    // return quadgramStats as an object
    return _.fromPairs(quadgramStats)
  }

  // returns a fitness score of text by referencing this.quadgramStats
  checkFitness(text) {
    let qArray= []
    let score = 0

    // remove numbers and whitespace from text
    text = CipherDecrypter.compress(text)

    // store quadgrams in qArray
    qArray = CipherDecrypter.extractQuadgrams(text)

    // get sum of quadgrams by pulling values from this.quadgramStats
    qArray.forEach((q) => {
      if(this.quadgramStats[q] != undefined) {
        score += this.quadgramStats[q]
      }else {
        score -= 9.4
      }
    })

    return score
  }

  // returns new text after replacing letters using a given key
  swapLetters(key, text) {
    let currentText = text
    let actionText = ''
    let cipherKey = key
    let charIndexes = {}

    // for each letter in CipherKey, create an array of indexes where they occur
    for (let char in cipherKey) {
      let indexes = []
      for (let ch in text ) {
        if (text[ch] == char) {
          indexes.push(ch)
        }
      }
      charIndexes[char] = indexes
    }

    // for each letter in charIndexes insert that letter into correct text indexes
    for (let key in charIndexes) {
      // for every index, replace character with its cipherKey value
      for (let i = 0; i < charIndexes[key].length; i++) {
        let ckey = charIndexes[key][i]
        actionText = CipherDecrypter.replaceAt(currentText, cipherKey[key], Number(ckey))
        currentText = actionText
      }
    }

    return currentText
  }

  // generates a new cipher key
  initialCipherKey() {
    const solvedE = this.findE()
    let unassignedKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let alphabet = 'FGHRULABJKOPSTCDMNVIWXYZQ'
    let key = {}

    // Add our known value of 'E' to cipherKey
    key[solvedE] = 'E'

    // Remove solvedE from unassignedKeys
    unassignedKeys = unassignedKeys.replace(solvedE, "")

    // for each letter in unassignedKeys, assign a random letter from alphabet
    for (let char in unassignedKeys){
        key[unassignedKeys[char]] = alphabet[char]
    }

    return key
  }

  // swap 2 characters in a given cipher key
  nextCipherKey(k) {
    let nextKey = k
    let currentEKey = Object.keys(nextKey).find(key => nextKey[key] === 'E')
    let unassigned = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let alpha = 'FGHIWXYZQRULABJKOPSTCDMNV'

    // keep current key for 'E'
    nextKey[currentEKey] = 'E'

    // Remove currentEKey from unassigned
    unassigned = unassigned.replace(currentEKey, "")

    // function to randomly select a letter from alphabet
    let randomLetter = () => {
      return alpha[Math.floor(Math.random() * alpha.length)]
    }

    // select random letter from alpha
    let random1 = randomLetter()
    // get key for first random letter
    let random1Key = Object.keys(nextKey).find(key => nextKey[key] === random1)

    // select random letter from alpha
    let random2 = randomLetter()
    // get key for second random letter
    let random2Key = Object.keys(nextKey).find(key => nextKey[key] === random2)

    nextKey[random2Key] = random1
    nextKey[random1Key] = random2

    return nextKey
  }

  // test cipher keys on encrypted seeking the best fitness score possible
  findBestKey() {
    let toDecrypt = CipherDecrypter.compress(this.encrypted)
    let cipherKey = {}
    let currentCipherText = ''
    let nextCipherText = ''
    let failures = 0
    let nextKey = {}
    let currentScore = 0
    let nextCipherScore = 0

    // get initial cipher key
    cipherKey = this.initialCipherKey()

    // copy current cipherKey to pass to this.nextKey() to be modified
    nextKey = this.nextCipherKey(Object.assign({}, cipherKey))

    // swap letters using current key
    currentCipherText = this.swapLetters(cipherKey, toDecrypt)
    // swap letters using possible next key
    nextCipherText = this.swapLetters(nextKey, toDecrypt)

    while(failures < 1000 ) {
      // currentScore is meassured by checking the fitness of toDecrypt with currentCipher
      currentScore = this.checkFitness(currentCipherText)
      // nextCipherscore is measured by checking the fitness of toDecrypt with nextCipher
      nextCipherScore = this.checkFitness(nextCipherText)

      // if currentScore is stronger than nextCipherScore, keep currentCipher
      // pass a copy of cipherKey to nextCipherKey so a new key can be generated
      // increment failures count
      if (currentScore >= nextCipherScore) {
        console.log(`keeping current cipher ${currentScore}`)
        nextKey = this.nextCipherKey(Object.assign({}, cipherKey))
        failures += 1
      }
      // if currentScore <= nextCipherScore, replace cipherKey with a copy of nextKey
      // replace nextKey with a key generated from nextCipherKey
      // display the key in the new cipherKey in the console
      // reset failure count
      else if (currentScore <= nextCipherScore){
        console.log(`replacing current cipher with next one ${nextCipherScore}`)
        cipherKey = Object.assign({}, nextKey)
        nextKey = this.nextCipherKey(Object.assign({}, nextKey))
        failures = 0
      }
      // after each scoring result, update currentCipherText and nextCipherText
      currentCipherText = this.swapLetters(cipherKey, toDecrypt)
      nextCipherText = this.swapLetters(nextKey, toDecrypt)
    }

    return cipherKey
  }

  solve() {
    let encryptedText = this.encrypted.toUpperCase()
    let answer = this.findBestKey()
    let solvedText = this.swapLetters(answer, encryptedText)
    return solvedText
  }
}
