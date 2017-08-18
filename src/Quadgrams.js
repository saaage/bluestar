export function calculateQuadrams(fullText) {

  let quadgramArray = []
  let quadgrams
  let text = ''
  let allQuadgrams = {}

  // create function to remove whitespace and punctuation
  let compress = (string) => {
    return string.match(/\w/g).join("").toUpperCase()
  }

  // create a function to remove numbers form string
  let removeNums = (string) => {
    return string.match(/\D/g).join("").toUpperCase()
  }

  // read first 800 characters of 'plain' into 'text'
  for(let i = 0; i < 100000; i++) {
    text = text + fullText[i]
  }

  // compress 'text'
  text = removeNums(compress(text))

  // move every quadgram from 'text' into 'quadgramArray'
  for(let i = 0; i < text.length - 4; i++) {
    let quadgram = text.substring(i, i + 4)
    quadgramArray.push(quadgram)
  }

  // create an object that is the result of tallying each quadgram
  allQuadgrams = _.countBy(quadgramArray)

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

  let totalQuadgramCount = 0

  for(let gram in allQuadgrams){
    totalQuadgramCount += allQuadgrams[gram]
  }

  // calculate log properties of each quadgram
  let sortedQuadgrams = sortByProperty(allQuadgrams)

  // push log probability into element
  sortedQuadgrams.forEach((element) => {
    let probability = Math.log(element[1]/totalQuadgramCount)/Math.log(10)
    element.push(probability)
  })

  // log top 100 quadgrams
  for(let i = 0; i < 100; i++){
    console.log(sortedQuadgrams[i])
  }

  return sortedQuadgrams
}
