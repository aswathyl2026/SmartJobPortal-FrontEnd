import React, { useEffect, useState } from 'react'
import { allJobAPI } from '../../../services/allAPI'
import { ToastContainer } from 'react-toastify'
import { FaClock, FaRupeeSign } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6"
import { TfiBag } from "react-icons/tfi"
import { Link } from 'react-router-dom'

function JobList() {

    const [allJob, setAllJob] = useState([])

    useEffect(() => {
        getJob()
    }, [])

    const getJob = async () => {
        const result = await allJobAPI()

        if (result.status == 200) {
            setAllJob(result.data.data)
        }
    }

    return (
        <>
            <div className="px-4 md:px-10 py-5">

                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                    All Jobs
                </h2>

                {
                    allJob?.length > 0 ?

                        allJob?.map(job => (

                            <div
                                key={job?._id}
                                className="bg-white rounded-2xl shadow-lg p-5 mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
                            >

                                {/* Left Section */}
                                <div className="flex items-start gap-4 flex-1">

                                    <img
                                        src="login.png"
                                        alt=""
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                                    />

                                    <div className="w-full">

                                        <h2 className="text-xl md:text-2xl font-semibold mb-1">
                                            {job?.title}
                                        </h2>

                                        <p className="text-gray-600 font-medium mb-4">
                                            {job?.company}
                                        </p>

                                        {/* Job Details */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm md:text-base">

                                            <p className='flex items-center gap-2'>
                                                <FaLocationDot />
                                                {job?.location}
                                            </p>

                                            <p className='flex items-center gap-2'>
                                                <TfiBag />
                                                {job?.jobtype}
                                            </p>

                                            <p className='flex items-center gap-2'>
                                                <FaRupeeSign />
                                                {job?.salary}
                                            </p>

                                            <p className='flex items-center gap-2'>
                                                <FaClock />
                                                {new Date(job?.createdAt).toLocaleDateString()}
                                            </p>

                                        </div>

                                    </div>
                                </div>

                                {/* Button Section */}
                                <div className="w-full lg:w-auto">

                                    <Link
                                        to={`/job/${job?._id}`}
                                        className="block text-center bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg transition duration-300"
                                    >
                                        VIEW DETAILS
                                    </Link>

                                </div>

                            </div>

                        ))

                        :

                        <div className="text-xl font-semibold text-center mt-10">
                            No Job Found
                        </div>
                }

            </div>

            <ToastContainer
                position='top-center'
                theme='colored'
                autoClose={3000}
            />
        </>
    )
}

export default JobList