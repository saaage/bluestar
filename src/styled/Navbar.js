import react from 'react'
import styled from 'styled-components'
import Nav from 'components/Nav'

const Navbar = styled(Nav)`
  background-color: #007EE1;
  height: 70px;
  position: fixed;
  width: 100%;

  a {
    color: white;
    font-family: 'Open Sans';
    margin-left: 1em;
    margin-top: 1.5em;
    position: absolute;
  }

  #hamburger {
    display: inline;
    float: right;
    margin-right: 1em;
    margin-top: 1.5em;
  }
`

export default Navbar
