import React from 'react'

const How = props =>
  <div className={props.className}>
    <ul>
      <li>
        <h2>Import CipherDecrypter.js</h2>
        <h3>Module available on <a href="https://gist.github.com/Sage911/293240809b1cc0de8d6b7c2ab2f936ce" target="_blank">Github</a></h3>
        <p>import CipherDecrypter from './CipherDecrypter'</p>
      </li>

      <li><h2>Create New CipherDecrypter</h2>
      <p>let Decrypter = new CipherDecrypter(texttodecrypt)</p></li>

      <li>
        <h2>Start Decrypter</h2>
        <h3>Returns: <em>String</em></h3>
        <p>Decrypter.solve()</p>
      </li>
    </ul>
  </div>

export default How
