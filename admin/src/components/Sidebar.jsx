import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
const Sidebar = () => {
  return (
    <div>
        <div>
            <NavLink to='/add'>
            <img className='w-5 h-5' src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Items</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar