// API that allows user to perform decryption actions on a given text
import _ from 'lodash'

export default class CipherDecrypter {
  constructor(base = "") {
    this.base = base.toUpperCase()
    this.quadgramStats = this.getQuadgramStats()
    this.sayHello()
    console.log(CipherDecrypter.extractQuadgrams('IN a 343432world where Zombies'))
  }

  // Let user know they have successfuly created a new CipherDecrypter
  sayHello() {
    console.log(`You have provided a new text with ${this.base.length} lines`)
  }

  // utility function that removes whitespace from a string
  static compress(string){
    return string.match(/\w/g).join("").toUpperCase()
  }

  // utility function that removes numbers from a string
  static removeNums(string) {
    return string.match(/\D/g).join("").toUpperCase()
  }

  // utility function that extracts all quadgrams from a text
  static extractQuadgrams(text) {
    let qArray = []

    text = CipherDecrypter.removeNums(CipherDecrypter.compress(text))

    for(let i = 0; i < text.length - 3; i++) {
      let q = text.substring(i, i + 4)
      qArray.push(q)
    }

    return qArray
  }

  // Returns quadgram stats as an object (derived from this.base)
  getQuadgramStats() {
    let allQuadgrams = []
    let sampleText = ''
    let totalQuadgramCount = 0
    let quadgramStats = {}

    // Take a large sample of this.base, store in 'sampleText'
    for(let i = 0; i < 100000; i++) {
      sampleText = sampleText + this.base[i]
    }

    // remove numbers and whitespace from text
    sampleText = CipherDecrypter.removeNums(CipherDecrypter.compress(sampleText))

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

  // calculates fitness (log probability) of text using this.quadgramStats
  checkFitness(text) {
    let q = input.toUpperCase()
    if(_.has(this.quadgramStats, q)) {
      return this.quadgramStats[q]
    }else {
      return -9.4
    }
  }
}
