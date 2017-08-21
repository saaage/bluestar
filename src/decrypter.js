import React from 'react'
import _ from 'lodash'
import encrypted from './encrypted.txt'
import example from './example.txt'
import CipherDecrypter from './CipherDecrypter'

class Decrypter extends React.Component {

  render() {

    let Encrypted = new CipherDecrypter(encrypted)

    return (
      <div>
        <p>Fancy React UI</p>
      </div>
    )
  }
}

export default Decrypter
