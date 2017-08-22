import React from 'react'
import _ from 'lodash'
import encrypted from './encrypted.txt'
import encrypted2 from './encrypted_hard.txt'
import CipherDecrypter from './CipherDecrypter'

class Decrypter extends React.Component {

  render() {

    let Encrypted = new CipherDecrypter(encrypted2)
    Encrypted.solve()

    return (
      <div>
        <p>Fancy React UI</p>
      </div>
    )
  }
}

export default Decrypter
