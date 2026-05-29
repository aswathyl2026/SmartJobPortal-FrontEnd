import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { toast } from 'react-toastify'

const navItems = [
    { label: "Dashboard", icon: "⊞", url: "/recruiter" },
    { label: "My Jobs",   icon: "💼", url: "/myjobs"   },
    { label: "Applicants",icon: "👥", url: "/applicant" },
    { label: "Profile",   icon: "👤", url: "/profile"  },
]

function Navbar({ sidebarOpen, setSidebarOpen }) {

    const navigate  = useNavigate()
    const location  = useLocation()
    const dispatch  = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        toast.success('Logged out successfully!')
        setTimeout(() => navigate('/login'), 1500)
    }

    return (
        <>
            {/* MOBILE OVERLAY */}
            {sidebarOpen && window.innerWidth < 768 && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className='fixed inset-0 bg-black/40 z-10'
                />
            )}

            {/* SIDEBAR */}
            <aside className={`
                bg-white border-r shadow-md z-20 transition-all duration-300 flex flex-col
                ${sidebarOpen ? "w-60" : "w-0"}
                md:w-60 fixed md:relative h-full overflow-hidden
            `}>

                {/* LOGO */}
                <div className='bg-blue-800 p-5 text-white'>
                    <div className='flex items-center gap-3'>
                        <img src="/logo2.png" alt="logo" className='w-14 h-14' />
                        <h1 className='text-xl font-bold'>
                            SMART <span className='text-blue-300'>JOB</span>
                        </h1>
                    </div>
                </div>

                {/* NAV ITEMS */}
                <nav className='p-4 flex flex-col gap-2 flex-1'>
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                navigate(item.url)
                                if (window.innerWidth < 768) setSidebarOpen(false)
                            }}
                            className={`flex items-center gap-3 p-3 rounded-lg transition font-medium
                                ${location.pathname === item.url
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* LOGOUT */}
                <div className='p-4'>
                    <button
                        onClick={handleLogout}
                        className='flex items-center gap-3 text-red-600 font-semibold'
                    >
                        ⏻ Logout
                    </button>
                </div>

            </aside>
        </>
    )
}

export default Navbar