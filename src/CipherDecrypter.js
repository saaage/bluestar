// API that allows user to perform decryption actions on a given text
import _ from 'lodash'
import plain from './plain.txt'

export default class CipherDecrypter {
  constructor(encrypted = "") {
    this.base = plain.toUpperCase()
    this.encrypted = encrypted
    this.quadgramStats = this.getQuadgramStats()
    this.sayHello()
    this.decrypt()
  }

  // Let user know they have successfuly created a new CipherDecrypter
  sayHello() {
    console.log(`You have provided a new encypted text that is`
                + ` ${this.encrypted.length} characters long`)
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

  static replaceAt(string, replacement, pos) {
    return `${string.substr(0, pos)}${replacement}${string.substr(pos + replacement.length)}`
  }

  // a utility function to find the most used character which has a strong
  //   chance of being our key for 'E'
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
    for(let i = 0; i < 2000000; i++) {
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
        // console.log(`${q}: ${this.quadgramStats[q]}`)
        score += this.quadgramStats[q]
      }else {
        // console.log(`${q}: -9.4`)
        score -= 9.4
      }
    })

    console.log(score)
  }

  // a function that tests multiple cipher keys on encrypted seeking the best
  //   fitness score possible
  decrypt() {
    let toDecrypt = CipherDecrypter.compress(this.encrypted)
    let currentText = ''
    let actionText = ''
    let cipherKey = {}
    let solvedE = this.findE()
    let unassignedKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let alphabet = 'FGHIWXYZQRULABJKOPSTCDMNV'
    let charIndexes = {}

    // Add our known value of 'E' to cipherKey
    cipherKey[solvedE] = 'E'

    // Remove solvedE from unassignedKeys
    unassignedKeys = unassignedKeys.replace(solvedE, "")

    // for each letter in unassignedKeys, assign a random letter from alphabet
    for (let char in unassignedKeys){
        cipherKey[unassignedKeys[char]] = alphabet[char]
    }

    // for each letter in CipherKey, create an array of indexes where they occur
    for (let char in cipherKey) {
      let indexes = []
      for (let ch in toDecrypt ) {
        if (toDecrypt[ch] == char) {
          indexes.push(ch)
        }
      }
      charIndexes[char] = indexes
    }

    currentText = toDecrypt
    // for each letter in charIndexes insert that letter into correct toDecrypt indexes
    for (let key in charIndexes) {
      // for every index, replace character with its cipherKey value
      for (let i = 0; i < charIndexes[key].length; i++) {
        let ckey = charIndexes[key][i]
        actionText = CipherDecrypter.replaceAt(currentText, cipherKey[key], Number(ckey))
        currentText = actionText
      }
    }

    console.log(currentText)

    // for every character in cipherKey, get indexes that need to be filled by that letter
    // for (let i=0; i < 26; i++) {
    //   re = new RegExp(`${alphabet[i]}`, 'g')
    //   toEncrypt = toEncrypt.replace(re, cipherKey[alphabet[i]])
    // }
  }

}
