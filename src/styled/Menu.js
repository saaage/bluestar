import React from 'react'
import styled from 'styled-components'
import icon from './Menu.svg'

const Menu = props => (
  <div className={props.className}>
    <img alt="logo" src={icon} />
  </div>
)

const MenuIcon = styled(Menu)`
  display: inline-block;
  float: right;
  height: 40px;
  margin-top: 1.5em;
  margin-right: 1em;
  width: 40px;

  @media (min-width: 1023px) {
    display: none;
  }
`

export default MenuIcon
