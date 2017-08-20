import React from 'react'
import _ from 'lodash'
import plain from './plain.txt'
import CipherDecrypter from './CipherDecrypter'

class Decrypter extends React.Component {

  render() {

    let shakespeare = new CipherDecrypter(plain)
    // shakespeare.decrypt('encrypted.txt')
    // shakespeare.getKeys()
    // shakespeare.checkProbability('skks')

    // Use plain.txt as a base to find quadgrams, then calculate probability of
    //   occurence

    return (

      <div>
        <p>Fancy React UI</p>
      </div>
    )
  }
}

export default Decrypter
