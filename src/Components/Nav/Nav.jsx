import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='navbar'>
        <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/characters'><li>Characters</li></Link>
            <Link to='/filter'><li>Filter</li></Link>
            
        </ul>
    </nav>
  )
}

export default Nav
