import React, { useState } from 'react'
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaTwitter
} from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const [toggle, setToggle]   = useState(false)
  const isAuthenticated       = useSelector((state) => state.auth.isAuthenticated)
  const user                  = useSelector((state) => state.auth.user)

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center">
          <img width={'70px'} height={'70px'} src="/logo2.png" alt="logo" />
          <h1 className='text-2xl font-bold ml-2 text-white'>
            SMART <span className="text-blue-500">JOB</span>
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <div className='hidden md:flex items-center text-white gap-8 font-medium'>
          <Link className='hover:text-blue-300 transition' to="/">HOME</Link>
          <Link className='hover:text-blue-300 transition' to="/jobs">JOBS</Link>
          <Link className='hover:text-blue-300 transition' to="/contact">CONTACT</Link>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>

          {/* Desktop: auth buttons OR welcome message */}
          <div className='hidden md:flex items-center gap-3'>
            {isAuthenticated ? (
              <span className='text-white font-medium'>
                Welcome, <span className='text-blue-300'>{user?.username}</span> 👋
              </span>
            ) : (
              <>
                <Link
                  to='/register'
                  className='border border-blue-500 text-white rounded px-4 py-2 hover:bg-blue-500 transition'
                >
                  Register
                </Link>
                <Link
                  to='/login'
                  className='bg-blue-500 border border-blue-500 text-white rounded px-4 py-2 hover:bg-transparent transition'
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Desktop Social Icons */}
          <div className='hidden md:flex items-center text-white text-xl gap-3'>
            <FaInstagram className='cursor-pointer hover:text-blue-400 transition' />
            <FaFacebook  className='cursor-pointer hover:text-blue-400 transition' />
            <FaTwitter   className='cursor-pointer hover:text-blue-400 transition' />
          </div>

          {/* Mobile Menu Icon */}
          <div
            className='md:hidden text-white text-2xl cursor-pointer'
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {toggle && (
        <div className='md:hidden text-white flex flex-col items-start px-5 gap-5 py-6 bg-black/80'>

          <Link onClick={() => setToggle(false)} to="/">HOME</Link>
          <Link onClick={() => setToggle(false)} to="/jobs">JOBS</Link>
          <Link onClick={() => setToggle(false)} to="/contact">CONTACT</Link>

          {/* Mobile: auth buttons OR welcome */}
          {isAuthenticated ? (
            <p className='text-blue-300 font-medium'>
              Welcome, {user?.username} 👋
            </p>
          ) : (
            <div className='flex flex-col gap-3 w-full mt-2'>
              <Link
                onClick={() => setToggle(false)}
                to="/register"
                className='border border-blue-500 text-white text-center rounded px-4 py-2 hover:bg-blue-500 transition'
              >
                Register
              </Link>
              <Link
                onClick={() => setToggle(false)}
                to="/login"
                className='bg-blue-500 border border-blue-500 text-white text-center rounded px-4 py-2 hover:bg-transparent transition'
              >
                Login
              </Link>
            </div>
          )}

          {/* Mobile Social */}
          <div className='flex gap-5 mt-2 text-xl'>
            <FaInstagram />
            <FaFacebook />
            <FaTwitter />
          </div>

        </div>
      )}
    </>
  )
}

export default Header
