import React from 'react'
import styled from 'styled-components'

const Additional = props =>
  <div className={props.className}>
    <h1>More Tools blah blah</h1>
  </div>

const Test = styled(Additional)`
  margin-top: 70px;
  @media (min-width: 1023px) {
    margin-top: 3em;
    margin-left: 262px;
  }
`

export default Test
