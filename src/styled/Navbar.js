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

  @media (min-width: 1023px) {
    position: fixed;
    width: 242px;
    height: 100vh;
  }
`

export default Navbar
