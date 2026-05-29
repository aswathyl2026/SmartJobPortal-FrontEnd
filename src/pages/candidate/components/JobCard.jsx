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
    FaRupeeSign,
    FaCheckCircle
} from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6"
import { TfiBag } from "react-icons/tfi"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function JobCard() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [modal, setModal] = useState(true)
    const [job, setJob] = useState({})
    const [resume, setresume] = useState("")
    const [appliedJobs, setAppliedJobs] = useState([])

    const getJobDetails = async (id) => {
        const result = await jobDetailsAPI(id)
        if (result.status === 200) {
            setJob(result.data.data)
        }
    }

    const allMyApp = async () => {
        const result = await allMyApplicationAPI()
        if (result.status === 200) {
            const validApplications = result.data.data.filter(
                (app) => app.job !== null
            )
            const ids = validApplications.map((app) => String(app.job._id))
            setAppliedJobs(ids)
        }
    }

    const handleUploadResume = (e) => {
        const file = e.target.files[0]
        if (file && file.type !== "application/pdf") {
            toast.warning("Only PDF files allowed")
            return
        }
        setresume(file)
    }

    const isApplied = appliedJobs.includes(String(job?._id))

    const upload = async () => {
        if (isApplied) {
            toast.warning("Already Applied")
            return
        }
        if (!resume) {
            toast.warning("Please upload resume")
            return
        }
        const reqBody = new FormData()
        reqBody.append("resume", resume)
        const result = await applyJobAPI(job._id, reqBody)
        if (result.status === 201) {
            toast.success("Applied Successfully")
            setAppliedJobs((prev) => [...prev, String(job._id)])
            setModal(true)
            setTimeout(() => navigate('/candidate'), 2000)
        } else {
            toast.error(result.response?.data || "Application Failed")
        }
    }

    useEffect(() => {
        getJobDetails(id)
        allMyApp()
    }, [id])

    // Split requirements by comma or newline into array
    const requirementsList = job?.requirements
        ? job.requirements.split(/,|\n/).map(r => r.trim()).filter(Boolean)
        : []

    // Split description by newline into array
    const descriptionLines = job?.description
        ? job.description.split('\n').filter(Boolean)
        : []

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

                <div className="px-4 md:px-10 py-6">

                    {/* TOP CARD */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 mb-6 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

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
                                        {job?.createdAt && new Date(job.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* APPLY SECTION */}
                        <div className="w-full xl:w-auto">
                            <button
                                onClick={() => { if (!isApplied) setModal(false) }}
                                disabled={isApplied}
                                className={`block text-center px-6 md:px-8 py-3 rounded-lg transition duration-300 font-semibold w-full md:w-auto
                                    ${isApplied
                                        ? "bg-gray-400 cursor-not-allowed text-white"
                                        : "bg-blue-700 hover:bg-blue-800 text-white"
                                    }`}
                            >
                                {isApplied ? "ALREADY APPLIED" : "APPLY NOW"}
                            </button>

                            {/* RESUME MODAL */}
                            {!modal && !isApplied && (
                                <div className='mt-5 bg-gray-100 rounded-xl p-5 flex flex-col items-center justify-center shadow-md'>
                                    <label htmlFor="resume" className='cursor-pointer'>
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
                                        {resume?.name ? resume.name : "Upload Resume PDF"}
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
                            )}
                        </div>
                    </div>

                    {/* BOTTOM SECTION — Requirements + Description */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* REQUIREMENTS */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-blue-700 mb-4 border-b pb-2">
                                🛠 Requirements
                            </h3>
                            {requirementsList.length > 0 ? (
                                <ul className="flex flex-col gap-3">
                                    {requirementsList.map((req, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                                            <FaCheckCircle className="text-blue-500 mt-0.5 shrink-0" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400 text-sm">No requirements listed</p>
                            )}
                        </div>

                        {/* JOB DESCRIPTION */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 xl:col-span-2">
                            <h3 className="text-lg font-bold text-blue-700 mb-4 border-b pb-2">
                                📋 Job Description
                            </h3>
                            {descriptionLines.length > 0 ? (
                                <div className="flex flex-col gap-2 text-gray-700 text-sm leading-relaxed">
                                    {descriptionLines.map((line, i) => (
                                        <p key={i}
                                            className={
                                                line.startsWith('**') || line.startsWith('#')
                                                    ? "font-bold text-gray-900 mt-2"
                                                    : line.startsWith('*') || line.startsWith('-')
                                                        ? "ml-4"
                                                        : ""
                                            }
                                        >
                                            {line.replace(/\*\*/g, '').replace(/^[\*\-]\s*/, '• ')}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">No description available</p>
                            )}
                        </div>

                    </div>

                </div>
            </div>

            <ToastContainer position="top-center" theme="colored" autoClose={3000} />
        </>
    )
}

export default JobCard