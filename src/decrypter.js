import React from 'react'
import _ from 'lodash'
import plain from './plain.txt'
import CipherDecrypter from './CipherDecrypter'

class Decrypter extends React.Component {

  render() {

    let Shakespeare = new CipherDecrypter(plain)

    return (
      <div>
        <p>Fancy React UI</p>
      </div>
    )
  }
}

export default Decrypter
