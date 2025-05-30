import React, { useState } from 'react'
import{Menu, X} from "lucide-react";
import logo from "../assets/logo.png"
import {navItems} from "../constants"
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen]= useState(false); 
    const toggleNavbar =()=>{
        setMobileDrawerOpen(!mobileDrawerOpen);
    }
  return (
    <nav className='sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80'>
        <div className="container px-4 mx-auto relative text-sm">
            <div className="flex justify-between items-center ">
                <Link to={'/'}><div className="flex items-center flex-shrink-0">
                    <img className='size-10 mr-2' src={logo} alt="" />
                    <span className="text-xl tracking-tight">ChatSense</span>
                </div>
                </Link>
                <ul className='hidden lg:flex ml-14 space-x-12'>
                    {navItems.map((item,index)=>{
                        return(
                            <li key={index}>
                                <a className='hover:text-purple-500' href={item.href}>{item.label}</a>
                            </li>
                        )
                    })}
                </ul>
                <div className="hidden lg:flex justify-center space-x-12 item-center">
                    <Link to={'/auth'} className='bg-gradient-to-r from-purple-600 to-purple-900 py-2 px-3 rounded-md'>Sign In/Register</Link>
                </div>
                <div className='lg:hidden md:flex flex-col justify-end'>
                    <button onClick={toggleNavbar}>
                        {mobileDrawerOpen ? <X/> : <Menu/>}
                    </button>
                </div>
            </div>
            {mobileDrawerOpen && (<div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                <ul>
                {navItems.map((item,index)=>{
                        return(
                            <li key={index} className='py-4 items-center'>
                                <a href={item.href}>{item.label}</a>
                            </li>
                        )
                    })}
                </ul>
                <Link to={'/auth'} className='bg-gradient-to-r from-purple-600 to-purple-900 mt-4 py-2 px-3 rounded-md'>Sign In/Register</Link>

            </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar