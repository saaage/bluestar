import React from 'react'
import _ from 'lodash'
import plain from './plain.txt'
import { calculateQuadrams } from './Quadgrams'

class Decrypter extends React.Component {

  render() {

    // Use plain.txt as a base to find quadgrams, then calculate probability of
    //   occurence
    calculateQuadrams(plain)

    return (

      <div>
        <p>hello :)</p>
      </div>
    )
  }
}

export default Decrypter
