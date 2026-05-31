import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaCamera } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'
import { ToastContainer, toast } from 'react-toastify'


const DEFAULT_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnEWi8Y-A6fCNXLlJRD16VGPe5ws8MGvMDXA&s"

function Header() {

    const [toggle, setToggle] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [modal, setModal] = useState(false)
    const [profileImage, setProfileImage] = useState(DEFAULT_IMG)
    const [previewImage, setPreviewImage] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = useSelector((state) => state.auth.token)
    const user = useSelector((state) => state.auth.user)

    // Fetch profile picture on mount
    useEffect(() => {
        if (!token) return
        const fetchProfile = async () => {
            try {
                const res = await fetch(`https://smartjobportal-backend-sk7i.onrender.com/get-profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json()
                if (data.picture) setProfileImage(data.picture)
            } catch (err) {
                console.error('Failed to fetch profile:', err)
            }
        }
        fetchProfile()
    }, [token])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setSelectedFile(file)
        const reader = new FileReader()
        reader.onloadend = () => setPreviewImage(reader.result)
        reader.readAsDataURL(file)
    }

    const handleChangePhoto = async () => {
        if (!selectedFile || !token) return
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('picture', selectedFile)

            const res = await fetch(`https://smartjobportal-backend-sk7i.onrender.com/update-profile`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            })

            const data = await res.json()

            if (data.success) {
                const imageUrl = `https://smartjobportal-backend-sk7i.onrender.com/uploads/${data.data.picture}`
                setProfileImage(imageUrl)
                handleModalClose()
                toast.success('Profile photo updated successfully!')
            } else {
                toast.error(data.message || 'Upload failed')
            }
        } catch (err) {
            console.error('Upload error:', err)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleModalClose = () => {
        setPreviewImage(null)
        setSelectedFile(null)
        setModal(false)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleLogout = () => {
        dispatch(logout())
        toast.success('Logged out successfully!')
        setTimeout(() => navigate('/login'), 1500)
    }

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
                    <Link className='hover:text-blue-200' to="/">HOME</Link>
                    <Link className='hover:text-blue-200' to="/candidate">JOBS</Link>
                    <Link className='hover:text-blue-200' to="/application">MY APPLICATIONS</Link>
                </div>

                {/* Right Section */}
                <div className='flex items-center gap-4'>
                    <div className='relative'>

                        {/* Profile Button */}
                        <button onClick={() => setDropDown(!dropDown)}>
                            <img
                                className='w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full object-cover border-2 border-white'
                                src={profileImage}
                                alt="profile"
                                onError={(e) => e.target.src = DEFAULT_IMG}
                            />
                        </button>

                        {/* Dropdown */}
                        {dropDown && (
                            <div className="absolute right-0 top-16 bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[170px]">
                                <p
                                    onClick={() => { setModal(true); setDropDown(false) }}
                                    className='px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700'
                                >
                                    Change Photo
                                </p>
                                <p
                                    onClick={handleLogout}
                                    className='px-4 py-3 hover:bg-gray-100 cursor-pointer text-red-500'
                                >
                                    Logout
                                </p>
                            </div>
                        )}

                        {/* Modal */}
                        {modal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">

                                {/* Backdrop */}
                                <div
                                    className="absolute inset-0 bg-black/40"
                                    onClick={handleModalClose}
                                />

                                {/* Modal Box */}
                                <div className="relative bg-white shadow-2xl rounded-2xl p-6 w-[300px] z-10">

                                    {/* Close Button */}
                                    <button
                                        onClick={handleModalClose}
                                        className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
                                    >
                                        ×
                                    </button>

                                    <h2 className="text-center text-blue-700 font-bold text-lg mb-4">
                                        Update Profile Photo
                                    </h2>

                                    <div className="flex flex-col items-center gap-4">

                                        {/* Clickable Image Preview */}
                                        <div
                                            className="relative group cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <img
                                                className='w-[130px] h-[130px] rounded-full object-cover border-4 border-blue-200 group-hover:opacity-80 transition'
                                                src={previewImage || profileImage}
                                                alt="preview"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition">
                                                <FaCamera className="text-white text-2xl" />
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-400">
                                            Click image to select a photo
                                        </p>

                                        {/* Hidden File Input */}
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            hidden
                                        />

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 w-full mt-1">
                                            <button
                                                onClick={handleModalClose}
                                                className="flex-1 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleChangePhoto}
                                                disabled={!selectedFile || loading}
                                                className={`flex-1 px-4 py-2 rounded-lg text-white text-sm font-semibold transition
                                                    ${selectedFile && !loading
                                                        ? 'bg-blue-700 hover:bg-blue-800'
                                                        : 'bg-blue-300 cursor-not-allowed'
                                                    }`}
                                            >
                                                {loading ? 'Saving...' : 'Save'}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}

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
                <div className='md:hidden bg-white shadow-md flex flex-col px-6 py-5 gap-5 text-blue-900 font-semibold'>
                    <Link to="/" onClick={() => setToggle(false)}>HOME</Link>
                    <Link to="/candidate" onClick={() => setToggle(false)}>JOBS</Link>
                    <Link to="/application" onClick={() => setToggle(false)}>MY APPLICATIONS</Link>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer
                position='top-center'
                theme='colored'
                autoClose={3000}
            />
        </>
    )
}

export default Header