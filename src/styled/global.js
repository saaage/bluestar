import { injectGlobal } from 'styled-components'

const global = injectGlobal`

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0px;
  }

  #root [data-reactroot] {
    height: 100vh;
  }
`

export default global
