import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import {
    FaCamera,
    FaLock,
    FaSave
} from 'react-icons/fa'

import {
    updateProfileAPI,
    resetPasswordAPI
} from '../../services/allAPI'

function RecruiterProfile() {

    const navigate = useNavigate()

    const user = JSON.parse(sessionStorage.getItem("user"))

    const [activeNav, setActiveNav] = useState("Profile")

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth > 768
    )

    const [preview, setPreview] = useState(

        user?.picture

            ?

            `http://localhost:3000/uploads/${user.picture}`

            :

            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

    )

    const [profileData, setProfileData] = useState({

        username: user?.username || "",

        company: user?.company || "",

        email: user?.email || "",

        picture: ""

    })

    const [passwordData, setPasswordData] = useState({

        oldPassword: "",

        newPassword: "",

        confirmPassword: ""

    })

    const navItems = [

        {
            label: "Dashboard",
            icon: "⊞",
            url: '/recruiter'
        },

        {
            label: "My Jobs",
            icon: "💼",
            url: '/myjobs'
        },

        {
            label: "Applicants",
            icon: "👥",
            url: '/applicant'
        },

        {
            label: "Profile",
            icon: "👤",
            url: '/profile'
        }

    ]

    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth < 768) {

                setSidebarOpen(false)

            }
            else {

                setSidebarOpen(true)

            }

        }

        window.addEventListener("resize", handleResize)

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            )

    }, [])

    // HANDLE PROFILE CHANGE

    const handleProfileChange = (e) => {

        const { name, value } = e.target

        setProfileData({

            ...profileData,

            [name]: value

        })

    }

    // HANDLE PASSWORD CHANGE

    const handlePasswordChange = (e) => {

        const { name, value } = e.target

        setPasswordData({

            ...passwordData,

            [name]: value

        })

    }

    // HANDLE IMAGE

    const handleImage = (e) => {

        const file = e.target.files[0]

        setProfileData({

            ...profileData,

            picture: file

        })

        setPreview(URL.createObjectURL(file))

    }

    // UPDATE PROFILE

    const updateProfile = async () => {

        const reqBody = new FormData()

        reqBody.append(
            "username",
            profileData.username
        )

        reqBody.append(
            "company",
            profileData.company
        )

        reqBody.append(
            "email",
            profileData.email
        )

        reqBody.append(
            "picture",
            profileData.picture
        )

        const token =
            sessionStorage.getItem("token")

        const reqHeader = {

            Authorization: `Bearer ${token}`

        }

        const result = await updateProfileAPI(

            reqBody,

            reqHeader

        )

        if (result.status === 200) {

            alert("Profile Updated Successfully")

            sessionStorage.setItem(
                "user",
                JSON.stringify(result.data.data)
            )

        }

    }

    // RESET PASSWORD

    const resetPassword = async () => {

        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {

            alert("Passwords do not match")

            return

        }

        const token =
            sessionStorage.getItem("token")

        const reqHeader = {

            Authorization: `Bearer ${token}`

        }

        const reqBody = {

            oldPassword:
                passwordData.oldPassword,

            newPassword:
                passwordData.newPassword

        }

        const result = await resetPasswordAPI(

            reqBody,

            reqHeader

        )

        if (result.status === 200) {

            alert("Password Reset Successfully")

            setPasswordData({

                oldPassword: "",

                newPassword: "",

                confirmPassword: ""

            })

        }

    }

    return (

        <div className='flex min-h-screen bg-gray-100 relative overflow-hidden'>

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
                            alt="logo"
                            className='w-12 h-12 md:w-16 md:h-16'
                        />

                        <h1 className='text-xl md:text-2xl font-bold'>

                            SMART

                            <span className='text-blue-300'>
                                {" "}JOB
                            </span>

                        </h1>

                    </div>

                </div>

                {/* NAVIGATION */}

                <nav className='p-4 flex flex-col gap-2'>

                    {
                        navItems.map((item) => (

                            <button
                                key={item.label}
                                onClick={() => {

                                    setActiveNav(item.label)

                                    navigate(item.url)

                                    if (
                                        window.innerWidth < 768
                                    ) {

                                        setSidebarOpen(false)

                                    }

                                }}
                                className={`
                                flex items-center gap-3 p-3 rounded-lg transition
                                ${activeNav === item.label
                                        ?
                                        "bg-blue-600 text-white"
                                        :
                                        "text-gray-700 hover:bg-gray-100"
                                    }
                            `}
                            >

                                <span>
                                    {item.icon}
                                </span>

                                <span className='font-medium'>
                                    {item.label}
                                </span>

                            </button>

                        ))
                    }

                </nav>

                {/* LOGOUT */}

                <div className='p-4 mt-auto'>

                    <button
                        className='flex items-center gap-3 text-red-600 font-semibold'
                    >

                        ⏻ Logout

                    </button>

                </div>

            </aside>

            {/* MAIN */}

            <div className='flex-1 flex flex-col overflow-hidden'>

                {/* HEADER */}

                

                {/* CONTENT */}

                <div className='flex-1 overflow-y-auto p-4 md:p-8'>

                    <h1 className='text-2xl md:text-3xl font-bold mb-8'>
                        Recruiter Profile
                    </h1>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

                        {/* PROFILE CARD */}

                        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>

                            <div className='flex flex-col items-center mb-8'>

                                <div className='relative'>

                                    <img
                                        src={preview}
                                        alt=""
                                        className='w-32 h-32 rounded-full object-cover border-4 border-blue-200'
                                    />

                                    <label
                                        htmlFor='profileImage'
                                        className='absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer'
                                    >

                                        <FaCamera />

                                        <input
                                            type="file"
                                            id='profileImage'
                                            hidden
                                            onChange={handleImage}
                                        />

                                    </label>

                                </div>

                                <h2 className='text-2xl font-bold mt-4'>
                                    {profileData.username}
                                </h2>

                                <p className='text-gray-500'>
                                    Recruiter Account
                                </p>

                            </div>

                            <div className='space-y-5'>

                                <div>

                                    <label className='block mb-2 font-medium'>
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name='username'
                                        value={profileData.username}
                                        onChange={handleProfileChange}
                                        className='w-full border rounded-xl p-3 outline-none focus:border-blue-500'
                                    />

                                </div>

                                <div>

                                    <label className='block mb-2 font-medium'>
                                        Company
                                    </label>

                                    <input
                                        type="text"
                                        name='company'
                                        value={profileData.company}
                                        onChange={handleProfileChange}
                                        className='w-full border rounded-xl p-3 outline-none focus:border-blue-500'
                                    />

                                </div>

                                <div>

                                    <label className='block mb-2 font-medium'>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name='email'
                                        value={profileData.email}
                                        onChange={handleProfileChange}
                                        className='w-full border rounded-xl p-3 outline-none focus:border-blue-500'
                                    />

                                </div>

                                <button
                                    onClick={updateProfile}
                                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3'
                                >

                                    <FaSave />

                                    Save Profile

                                </button>

                            </div>

                        </div>

                        {/* PASSWORD CARD */}

                        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>

                            <div className='flex items-center gap-3 mb-8'>

                                <div className='bg-red-100 p-4 rounded-full'>

                                    <FaLock className='text-red-600 text-2xl' />

                                </div>

                                <div>

                                    <h2 className='text-2xl font-bold'>
                                        Reset Password
                                    </h2>

                                    <p className='text-gray-500 text-sm'>
                                        Update your password
                                    </p>

                                </div>

                            </div>

                            <div className='space-y-5'>

                                <div>

                                    <label className='block mb-2 font-medium'>
                                        Current Password
                                    </label>

                                    <input
                                        type="password"
                                        name='oldPassword'
                                        value={passwordData.oldPassword}
                                        onChange={handlePasswordChange}
                                        className='w-full border rounded-xl p-3 outline-none focus:border-blue-500'
                                    />

                                </div>

                                <div>

                                    <label className='block mb-2 font-medium'>
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        name='newPassword'
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className='w-full border rounded-xl p-3 outline-none focus:border-blue-500'
                                    />

                                </div>

                                <div>

                                    <label className='block mb-2 font-medium'>
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name='confirmPassword'
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className='w-full border rounded-xl p-3 outline-none focus:border-blue-500'
                                    />

                                </div>

                                <button
                                    onClick={resetPassword}
                                    className='w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold'
                                >
                                    Reset Password
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default RecruiterProfile