import React from 'react'
import styled from 'styled-components'
import icon from './Menu.svg'

const menu = props => (
  <div className={props.className}>
    <img alt="logo" src={icon} />
  </div>
)

const MenuIcon = styled(menu)`
  display: inline-block;
  float: right;
  height: 40px;
  margin-top: 1.5em;
  margin-right: 1em;
  width: 40px;
`

export default MenuIcon
