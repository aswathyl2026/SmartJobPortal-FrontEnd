import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FaBars,
    FaTimes
} from "react-icons/fa";


function Header() {
   
    const [toggle, setToggle] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [modal, setModal] = useState(false)

    return (

        <>

            {/* Navbar */}
            <div className="flex items-center justify-between px-4 md:px-8 bg-blue-700 py-4 relative">

                {/* Logo */}
                <div className="flex items-center">

                    <img
                        className='w-[55px] h-[55px] md:w-[70px] md:h-[70px]'
                        src="/logo2.png"
                        alt="logo"
                    />

                    <h1 className='text-lg md:text-2xl font-bold ml-2 text-white'>
                        SMART <span className="text-blue-300">JOB</span>
                    </h1>

                </div>

                {/* Desktop Nav Links */}
                <div className='hidden md:flex items-center text-white gap-8 font-medium'>

                    <Link className='hover:text-blue-200' to="/">
                        HOME
                    </Link>

                    <Link className='hover:text-blue-200' to="/candidate">
                        JOBS
                    </Link>

                    <Link className='hover:text-blue-200' to="/application">
                        MY APPLICATIONS
                    </Link>

                </div>

                {/* Right Section */}
                <div className='flex items-center gap-4'>

                    {/* Profile */}
                    <div className='relative'>

                        <button
                            onClick={() => setDropDown(!dropDown)}
                        >
                            <img
                                className='w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full object-cover border-2 border-white'
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnEWi8Y-A6fCNXLlJRD16VGPe5ws8MGvMDXA&s"
                                alt=""
                            />
                        </button>

                        {/* Dropdown */}
                        {
                            dropDown &&

                            <div className="absolute right-0 top-16 bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[170px]">

                                <p
                                    onClick={() => {
                                        setModal(true)
                                        setDropDown(false)
                                    }}
                                    className='px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700'
                                >
                                    Change Photo
                                </p>

                                <p className='px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700'>
                                    Logout
                                </p>

                            </div>
                        }

                        {/* Modal */}
                        {
                            modal &&

                            <div className="absolute top-20 right-0 bg-white shadow-xl rounded-xl p-5 z-50 w-[280px]">

                                {/* Close Button */}
                                <div className="flex justify-end">

                                    <button
                                        onClick={() => setModal(false)}
                                        className="text-red-500 text-2xl font-bold"
                                    >
                                        ×
                                    </button>

                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-4 items-center">

                                    <label
                                        htmlFor="picture"
                                        className='cursor-pointer'
                                    >

                                        <input
                                            type="file"
                                            id="picture"
                                            hidden
                                        />

                                        <img
                                            className='w-[120px] h-[120px] rounded-full object-cover border-4 border-blue-200'
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnEWi8Y-A6fCNXLlJRD16VGPe5ws8MGvMDXA&s"
                                            alt=""
                                        />

                                    </label>

                                    <button
                                        className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
                                    >
                                        Change
                                    </button>

                                </div>

                            </div>
                        }

                    </div>

                    {/* Mobile Menu Icon */}
                    <div
                        className='md:hidden text-white text-2xl cursor-pointer'
                        onClick={() => setToggle(!toggle)}
                    >
                        {
                            toggle ? <FaTimes /> : <FaBars />
                        }
                    </div>

                </div>

            </div>

            {/* Mobile Menu */}
            {
                toggle &&

                <div className='md:hidden bg-white shadow-md flex flex-col px-6 py-5 gap-5 text-blue-900 font-semibold'>

                    <Link
                        to="/"
                        onClick={() => setToggle(false)}
                    >
                        HOME
                    </Link>

                    <Link
                        to="/candidate"
                        onClick={() => setToggle(false)}
                    >
                        JOBS
                    </Link>

                    <Link
                        to="/application"
                        onClick={() => setToggle(false)}
                    >
                        MY APPLICATIONS
                    </Link>

                </div>
            }

        </>
    )
}

export default Header