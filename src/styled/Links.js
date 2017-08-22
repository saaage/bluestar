import React from 'react'
import styled from 'styled-components'

const Links = styled.ul`
  background-color: #007EE1;
  color: white;
  font-family: 'Open Sans';
  height: 100vh;
  list-style-type: none;
  margin: 0px;
  padding-top: 1em;

  li:nth-child(2){
    padding-left: 1em;
  }

  li:nth-child(3){
    margin-top: .75em;
  }

  a {
    text-decoration: none;
    color: white;
  }

  @media (min-width: 1023px) {
    margin-top: 1em;
  }
`

export default Links
