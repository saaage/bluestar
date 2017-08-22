import React from 'react'
import Logo from 'styled/Logo'
import MenuIcon from 'styled/Menu'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    let links = this.links
    if(links.style.display === 'none'){
      links.style.display = 'block'
    } else if (links.style.display === 'block'){
      links.style.display = 'none'
    }
  }

  render(){
    const noDisplay = { display: 'none'}

    return (
      <nav className={this.props.className}>
        <Logo />
        <a id="logo">Blue Star Decrypter</a>
        <span onClick={this.handleClick}><MenuIcon /></span>
        <ul style={noDisplay} ref={(links) => { this.links = links}}>
          <li>How To Use</li>
          <li>Additional Tools</li>
          <li><a href="https://github.com/Sage911/bluestar" target="_blank">Github</a></li>
        </ul>
      </nav>
    )
  }
}

export default Nav
