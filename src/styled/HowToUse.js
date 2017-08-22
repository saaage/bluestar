import React from 'react'
import styled from 'styled-components'
import How from 'components/How'

const HowToUse = styled(How)`
  h1, h2, h3, h4, h5, p, em {
    font-family: 'Open Sans'
  }

  a {
    color: #3EA074;
    text-decoration: none;
  }

  p {
    background-color: #30343F;
    color: white;
    font-family: 'Overpass Mono';
    font-size: 14px;
    padding-left: 5px;
    padding-top: 2px;
    max-width: 500px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 4em;
  }

  margin-left: 1em;
  margin-right: 1em;
  margin-top: 5.375em;

  @media (min-width: 1023px) {
    margin-top: 3em;
    margin-left: 300px;
  }
`

export default HowToUse
