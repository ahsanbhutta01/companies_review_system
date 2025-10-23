'use client'

import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'

const NavWrapper = () => {
  const [showNav, setShowNav] = useState(false);
  

  function closeNav(){
    setShowNav(false)
  }
  function openNav(){
    setShowNav(true)
  }

  return (
    <div>
      <Nav openNav={openNav}/>
      <MobileNav showNav={showNav} closeNav={closeNav}/>
    </div>
  )
}

export default NavWrapper
