import React from 'react'

const Additional = props =>
  <div className={props.className}>
    <h1>CipherDecrypter API</h1>
    <ul>
      <li>
        <h2>Decrypter.<span>findE()</span></h2>
        <h3>Returns: <em>String</em></h3>
        <p>Returns the most likely Cipher Key for the letter 'E'</p>
      </li>

      <li>
        <h2>Decrypter.<span>getQuadgramStats()</span></h2>
        <h3>Returns: <em>Object</em></h3>
        <p>Returns all of the quadgrams, along with their log probability
            of occurence (derived from base text.)</p>
      </li>

      <li>
        <h2>Decrypter.<span>checkFitness(text)</span></h2>
        <h3>Returns: <em>Number</em></h3>
        <p>Returns a fitness score of text by referencing this.quadgramStats</p>
      </li>

      <li>
        <h2>Decrypter.<span>swapLetters(key, text)</span></h2>
        <h3>Returns: <em>String</em></h3>
        <p>Returns new text after replacing letters using a given key.</p>
      </li>

      <li>
        <h2>Decrypter.<span>initialCipherKey()</span></h2>
        <h3>Returns: <em>Object</em></h3>
        <p>Generates an initial cipher key.</p>
      </li>

      <li>
        <h2>Decrypter.<span>nextCipherKey(key)</span></h2>
        <h3>Returns: <em>Object</em></h3>
        <p>Genrates a new cipher key from a given cipher key by swapping 2 characters.</p>
      </li>

      <li>
        <h2>Decrypter.<span>findBestKey()</span></h2>
        <h3>Returns: <em>Object</em></h3>
        <p>Returns best possible key after 1000 consecutive attempts with no increase in fitness.</p>
      </li>

      <li>
        <h2>Decrypter.<span>solve()</span></h2>
        <h3>Returns: <em>String</em></h3>
        <p>Returns encrypted version of provided text.</p>
      </li>

    </ul>
  </div>

export default Additional
