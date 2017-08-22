import react from 'react'
import styled from 'styled-components'
import Nav from 'components/Nav'

const Navbar = styled(Nav)`
  background-color: #007EE1;
  height: 70px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  #logo {
    color: white;
    font-family: 'Open Sans';
    margin-left: 1em;
    margin-top: 1.5em;
    position: absolute;
  }

  ul {
    background-color: #007EE1;
    color: white;
    font-family: 'Open Sans';
    height: 100vh;
    list-style-type: none;
    margin: 0px;
    a {
      text-decoration: none;
      color: white;
    }
  }
`

export default Navbar
