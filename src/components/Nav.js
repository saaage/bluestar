import React from 'react'
import { Link } from 'react-router-dom'
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

  // What links do you want to add. Do we need React Router?

  render(){
    const noDisplay = { display: 'none'}

    return (
      <nav className={this.props.className}>
        <Logo />
        <a id="logo">Blue Star Decrypter</a>
        <span onClick={this.handleClick}><MenuIcon /></span>
        <Links style={noDisplay} innerRef={(links) => { this.links = links}}>
          <li><Link to="/">How To Use</Link></li>
          <li><Link to="/tools">Additional Tools</Link></li>
          <li>
            <a href="https://gist.github.com/Sage911/293240809b1cc0de8d6b7c2ab2f936ce" target="_blank">Github</a>
          </li>
        </Links>
      </nav>
    )
  }
}

export default Nav
