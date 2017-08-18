// Decrypter will accept a txt file
import React from 'react'
// var fs = require('fs')

class Decrypter extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    // const userFile = fs.readFile(this.file)
  }

  render() {
    return (
      <div>
        <input ref={(node) => { this.file = node }} type="file" accept="text/*" onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Decrypter
