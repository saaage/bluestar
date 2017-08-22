import React from 'react'
import styled from 'styled-components'
import Additional from 'components/Additional'

const Tools = styled(Additional)`
  h1, h2, h3, h4, h5, p, em {
    font-family: 'Open Sans'
  }

  h1 {
    color: #30343F;
  }

  em {
    color: #979797;
  }

  span {
    color: #3EA074;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 3em;
  }

  margin-left: 1em;
  margin-right: 1em;
  margin-top: 5.375em;
  @media (min-width: 1023px) {
    margin-top: 3em;
    margin-left: 300px;
  }
`

export default Tools
