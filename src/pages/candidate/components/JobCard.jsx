import React, { useEffect, useState } from 'react'
import Header from './Header'

import {
    allMyApplicationAPI,
    applyJobAPI,
    jobDetailsAPI
} from '../../../services/allAPI'

import {
    FaArrowCircleUp,
    FaBackward,
    FaClock,
    FaRupeeSign
} from 'react-icons/fa'

import { FaLocationDot } from "react-icons/fa6"
import { TfiBag } from "react-icons/tfi"

import {
    Link,
    useNavigate,
    useParams
} from 'react-router-dom'

import {
    ToastContainer,
    toast
} from 'react-toastify'

function JobCard() {

    const navigate = useNavigate()

    const [modal, setModal] = useState(true)

    const [job, setJob] = useState({})

    const [appliedJobs, setAppliedJobs] = useState([])

    const [resume, setresume] = useState("")

    const { id } = useParams()

    // ================= GET JOB DETAILS =================

    const getJobDetails = async (id) => {

        const result = await jobDetailsAPI(id)

        if (result.status === 200) {

            setJob(result.data.data)

        }

    }

    // ================= GET MY APPLICATIONS =================

    const allMyApp = async () => {

        const result = await allMyApplicationAPI()

        if (result.status === 200) {

            const ids = result.data.data.map(
                app => app.job._id.toString()
            )

            setAppliedJobs(ids)

        }

    }

    // ================= HANDLE RESUME =================

    const handleUploadResume = (e) => {

        const file = e.target.files[0]

        if (file && file.type !== "application/pdf") {

            toast.warning("Only PDF files allowed")

            return

        }

        setresume(file)

    }

    // ================= APPLY JOB =================

    const upload = async () => {

        if (!resume) {

            toast.warning("Please upload resume")

            return

        }

        const reqBody = new FormData()

        reqBody.append("resume", resume)

        const result = await applyJobAPI(
            job._id,
            reqBody
        )

        if (result.status === 201) {

            toast.success("Applied Successfully")

            // ADD NEW APPLIED JOB

            setAppliedJobs(prev => [
                ...prev,
                job._id.toString()
            ])

            // CLOSE MODAL

            setModal(true)

            // REDIRECT

            setTimeout(() => {

                navigate('/candidate')

            }, 2000)

        }

        else {

            toast.error("Application Failed")

        }

    }

    // ================= CHECK APPLIED =================

    const isApplied = appliedJobs.includes(
        job?._id?.toString()
    )

    // ================= USE EFFECT =================

    useEffect(() => {

        getJobDetails(id)

        allMyApp()

    }, [id])

    return (
        <>

            <Header />

            <div className="bg-gray-100 min-h-screen">

                {/* BACK BUTTON */}

                <div className="flex items-center justify-start px-4 md:px-10 pt-5">

                    <FaBackward className='text-blue-400 pe-2' />

                    <Link
                        to={'/candidate'}
                        className='text-blue-400 py-2 rounded-lg text-sm md:text-base font-medium'
                    >

                        Back to Jobs

                    </Link>

                </div>

                {/* MAIN CONTAINER */}

                <div className="px-4 md:px-10 py-6">

                    {/* TOP CARD */}

                    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 mb-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

                        {/* LEFT */}

                        <div className="flex flex-col sm:flex-row items-start gap-5 flex-1">

                            <img
                                src="/login.png"
                                alt=""
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                            />

                            <div className="w-full">

                                <h2 className="text-2xl md:text-3xl font-bold mb-2">

                                    {job?.title}

                                </h2>

                                <p className="text-gray-600 text-base md:text-lg mb-5">

                                    {job?.company}

                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 text-sm md:text-base">

                                    <p className="flex items-center gap-2">

                                        <FaLocationDot className="text-blue-600" />

                                        {job?.location}

                                    </p>

                                    <p className="flex items-center gap-2">

                                        <TfiBag className="text-blue-600" />

                                        {job?.jobtype}

                                    </p>

                                    <p className="flex items-center gap-2">

                                        <FaRupeeSign className="text-blue-600" />

                                        {job?.salary}

                                    </p>

                                    <p className="flex items-center gap-2">

                                        <FaClock className="text-blue-600" />

                                        {
                                            job?.createdAt &&
                                            new Date(job.createdAt)
                                                .toLocaleDateString()
                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* APPLY SECTION */}

                        <div className="w-full xl:w-auto">

                            <button
                                onClick={() => setModal(false)}
                                disabled={isApplied}
                                className={`block text-center px-6 md:px-8 py-3 rounded-lg transition duration-300 font-semibold w-full md:w-auto
                                    
                                    ${isApplied
                                        ? "bg-gray-400 cursor-not-allowed text-white"
                                        : "bg-blue-700 hover:bg-blue-800 text-white"
                                    }
                                `}
                            >

                                {
                                    isApplied
                                        ? "ALREADY APPLIED"
                                        : "APPLY NOW"
                                }

                            </button>

                            {/* RESUME MODAL */}

                            {
                                !modal && !isApplied && (

                                    <div className='mt-5 bg-gray-100 rounded-xl p-5 flex flex-col items-center justify-center shadow-md'>

                                        <label
                                            htmlFor="resume"
                                            className='cursor-pointer'
                                        >

                                            <input
                                                type="file"
                                                id='resume'
                                                hidden
                                                onChange={handleUploadResume}
                                            />

                                            <img
                                                className='mb-4 w-[80px] h-[80px] rounded-full object-cover border-2 border-white'
                                                src="https://img.freepik.com/premium-vector/file-upload-vector-icon-design-illustration_1174953-75051.jpg"
                                                alt=""
                                            />

                                        </label>

                                        <p className='text-sm text-gray-700 text-center break-all'>

                                            {
                                                resume?.name
                                                    ? resume.name
                                                    : "Upload Resume PDF"
                                            }

                                        </p>

                                        <div className='flex gap-3 mt-5'>

                                            <button
                                                onClick={upload}
                                                className='bg-blue-600 hover:bg-blue-700 rounded-lg p-3 text-white transition'
                                            >

                                                <FaArrowCircleUp />

                                            </button>

                                            <button
                                                onClick={() => setModal(true)}
                                                className='bg-red-500 hover:bg-red-600 rounded-lg px-4 text-white transition'
                                            >

                                                Cancel

                                            </button>

                                        </div>

                                    </div>

                                )
                            }

                        </div>

                    </div>

                    {/* BOTTOM SECTION */}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* DESCRIPTION */}

                        <div className="lg:col-span-8 bg-white shadow-lg rounded-2xl p-5 md:p-8">

                            <h2 className="text-xl md:text-2xl font-bold mb-4">

                                Job Description

                            </h2>

                            <p className="text-gray-700 mb-8 leading-7">

                                {job?.description}

                            </p>

                            <h2 className="text-xl md:text-2xl font-bold mb-4">

                                Requirements

                            </h2>

                            <p className="text-gray-700 leading-7">

                                {job?.requirements}

                            </p>

                        </div>

                        {/* OVERVIEW */}

                        <div className="lg:col-span-4 bg-white shadow-lg rounded-2xl p-5 md:p-6 h-fit">

                            <h2 className="text-xl md:text-2xl font-bold mb-6">

                                Job Overview

                            </h2>

                            <div className="space-y-5">

                                <div>

                                    <h3 className="text-gray-500 font-semibold">

                                        Published By

                                    </h3>

                                    <p>{job?.company}</p>

                                </div>

                                <div>

                                    <h3 className="text-gray-500 font-semibold">

                                        Job Type

                                    </h3>

                                    <p>{job?.jobtype}</p>

                                </div>

                                <div>

                                    <h3 className="text-gray-500 font-semibold">

                                        Location

                                    </h3>

                                    <p>{job?.location}</p>

                                </div>

                                <div>

                                    <h3 className="text-gray-500 font-semibold">

                                        Salary

                                    </h3>

                                    <p>₹ {job?.salary}</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <ToastContainer
                position="top-center"
                theme="colored"
                autoClose={3000}
            />

        </>
    )
}

export default JobCard