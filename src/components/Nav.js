import React from 'react'
import Logo from 'styled/Logo'
import MenuIcon from 'styled/Menu'

const Nav = props =>
  <nav className={props.className}>
    <Logo />
    <a>Blue Star Decrypter</a>
    <MenuIcon />
  </nav>

export default Nav
