import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function RecruiterLayout({ children }) {

    // USER STATE

    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    )

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth > 768
    )

    // WINDOW RESIZE

    useEffect(() => {

        const handleResize = () => {

            setSidebarOpen(window.innerWidth > 768)

        }

        window.addEventListener("resize", handleResize)

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            )

    }, [])

    // UPDATE USER WHEN SESSION STORAGE CHANGES

    useEffect(() => {

        const updateUser = () => {

            setUser(
                JSON.parse(sessionStorage.getItem("user"))
            )

        }

        window.addEventListener("storage", updateUser)

        return () =>
            window.removeEventListener(
                "storage",
                updateUser
            )

    }, [])

    return (

        <div className='flex h-screen bg-gray-100 overflow-hidden'>

            {/* SIDEBAR */}

            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* MAIN AREA */}

            <div className='flex-1 flex flex-col overflow-hidden'>

                {/* HEADER */}

                <header className='bg-white border-b h-16 px-4 md:px-6 flex items-center justify-between shrink-0'>

                    {/* HAMBURGER */}

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className='text-2xl text-gray-700 md:hidden'
                    >
                        ☰
                    </button>

                    {/* USER INFO */}

                    <div className='flex items-center gap-3 ml-auto'>

                        <img
                            src={
                                user?.picture
                                    ?
                                    `http://localhost:3000/uploads/${user.picture}?t=${Date.now()}`
                                    :
                                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            }
                            alt="profile"
                            className='w-10 h-10 rounded-full object-cover border'
                        />

                        <div className='hidden sm:block'>

                            <h3 className='font-semibold text-sm'>

                                {user?.company || "Recruiter"}

                            </h3>

                            <p className='text-xs text-gray-500'>

                                {user?.username}

                            </p>

                        </div>

                    </div>

                </header>

                {/* PAGE CONTENT */}

                <main className='flex-1 overflow-y-auto p-4 md:p-6'>

                    {children}

                </main>

            </div>

            <ToastContainer
                position='top-center'
                theme='colored'
                autoClose={1500}
            />

        </div>

    )

}

export default RecruiterLayout