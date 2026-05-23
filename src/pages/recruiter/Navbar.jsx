import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate()

    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    )

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth > 768
    )

    useEffect(() => {

        const storedUser = JSON.parse(
            sessionStorage.getItem("user")
        )

        setUser(storedUser)

        const handleResize = () => {

            if (window.innerWidth < 768) {

                setSidebarOpen(false)

            } else {

                setSidebarOpen(true)

            }

        }

        window.addEventListener(
            "resize",
            handleResize
        )

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            )

    }, [])

    const logout = () => {

        sessionStorage.clear()

        navigate('/login')

    }

    return (

        <>

            {/* MOBILE OVERLAY */}

            {
                sidebarOpen &&
                window.innerWidth < 768 && (

                    <div
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className='fixed inset-0 bg-black/40 z-10'
                    />

                )
            }

            <div className='flex min-h-screen bg-gray-100'>

                {/* SIDEBAR */}

                <aside
                    className={`
                        bg-white border-r shadow-md z-20 transition-all duration-300
                        ${sidebarOpen ? "w-60" : "w-0"}
                        md:relative fixed h-screen overflow-hidden
                    `}
                >

                    {/* LOGO */}

                    <div className='bg-blue-800 p-5 text-white'>

                        <div className='flex items-center gap-3'>

                            <img
                                src="/logo2.png"
                                alt=""
                                className='w-14 h-14 md:w-16 md:h-16'
                            />

                            <h1 className='text-xl md:text-2xl font-bold'>

                                SMART

                                <span className='text-blue-300'>
                                    {" "}JOB
                                </span>

                            </h1>

                        </div>

                    </div>

                    {/* NAV ITEMS */}

                    <nav className='p-4 flex flex-col gap-2'>

                        <button
                            onClick={() =>
                                navigate('/recruiter')
                            }
                            className='flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition'
                        >

                            <span>⊞</span>

                            <span className='font-medium'>
                                Dashboard
                            </span>

                        </button>

                        <button
                            onClick={() =>
                                navigate('/myjobs')
                            }
                            className='flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition'
                        >

                            <span>💼</span>

                            <span className='font-medium'>
                                My Jobs
                            </span>

                        </button>

                        <button
                            onClick={() =>
                                navigate('/applicant')
                            }
                            className='flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition'
                        >

                            <span>👥</span>

                            <span className='font-medium'>
                                Applicants
                            </span>

                        </button>

                        <button
                            onClick={() =>
                                navigate('/profile')
                            }
                            className='flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition'
                        >

                            <span>👤</span>

                            <span className='font-medium'>
                                Profile
                            </span>

                        </button>

                    </nav>

                    {/* LOGOUT */}

                    <div className='p-4 mt-auto'>

                        <button
                            onClick={logout}
                            className='flex items-center gap-3 text-red-600 font-semibold'
                        >

                            ⏻ Logout

                        </button>

                    </div>

                </aside>

                {/* MAIN SECTION */}

                <div className='flex-1 flex flex-col overflow-hidden'>

                    {/* HEADER */}

                    <header className='bg-white border-b h-16 px-4 md:px-6 flex items-center justify-between'>

                        {/* MENU BUTTON */}

                        <button
                            onClick={() =>
                                setSidebarOpen(!sidebarOpen)
                            }
                            className='text-2xl text-gray-700'
                        >
                            ☰
                        </button>

                        {/* USER */}

                        <div className='flex items-center gap-3'>

                            <img
                                src={
                                    user?.picture
                                        ?
                                        `http://localhost:3000/uploads/${user.picture}`
                                        :
                                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                }
                                alt=""
                                className='w-10 h-10 rounded-full object-cover border'
                            />

                            <div className='hidden sm:block'>

                                <h3 className='font-semibold text-sm md:text-base'>

                                    {
                                        user?.company
                                            ?
                                            user.company
                                            :
                                            "Recruiter"
                                    }

                                </h3>

                                <p className='text-xs text-gray-500'>

                                    {user?.username}

                                </p>

                            </div>

                        </div>

                    </header>

                    {/* PAGE CONTENT */}

                    <div className='flex-1 overflow-y-auto p-4 md:p-8'>

                        <div className='bg-white rounded-2xl shadow p-6 min-h-[300px]'>

                            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>

                                Welcome {user?.username}

                            </h1>

                            <p className='text-gray-500 mt-2'>

                                Recruiter Dashboard Panel

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}

export default Navbar