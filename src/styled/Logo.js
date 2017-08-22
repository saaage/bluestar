import React from 'react'
import styled from 'styled-components'
import logo from './BlueStarLogo.svg'

const rawlogo = props => (
  <div className={props.className}>
    <img alt="logo" src={logo} />
  </div>
)

const Logo = styled(rawlogo)`
  display: inline-block;
  height: 40px;
  margin-left: 1em;
  margin-top: .75em;
  width: 40px;
`

export default Logo
