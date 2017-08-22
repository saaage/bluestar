import React from 'react'
import Logo from 'styled/Logo'
import MenuIcon from 'styled/Menu'
import Links from 'styled/Links'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDisplay)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDisplay)
  }

  updateDisplay() {
    let links = this.links
    if(window.innerWidth > 1023) {
      links.style.display = 'block'
    } else {
      links.style.display = 'none'
    }
  }

  handleClick() {
    let links = this.links
    if(links.style.display === 'block'){
        links.style.display = 'none'
    } else if (links.style.display === 'none'){
      links.style.display = 'block'
    }
  }

  render(){
    const noDisplay = { display: 'none'}

    return (
      <nav className={this.props.className}>
        <Logo />
        <a id="logo">Blue Star Decrypter</a>
        <span onClick={this.handleClick}><MenuIcon /></span>
        <Links style={noDisplay} innerRef={(links) => { this.links = links}}>
          <li>How To Use</li>
          <li>Additional Tools</li>
          <li>
            <a href="https://github.com/Sage911/bluestar" target="_blank">Github</a>
          </li>
        </Links>
      </nav>
    )
  }
}

export default Nav
