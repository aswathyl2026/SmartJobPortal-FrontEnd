import React, { useEffect, useState } from 'react'

import {
    recruiterAllApplicantsAPI
} from '../../services/allAPI'

import {
    FaUsers,
    FaBriefcase,
    FaUserCheck,
    FaUserTimes
} from 'react-icons/fa'

import RecruiterLayout from './RecruiterLayout'

function Applicant() {

    const [allApplicants, setAllApplicants] = useState([])

    const [stats, setStats] = useState({

        totalApplicants: 0,

        totalJobs: 0,

        shortlisted: 0,

        rejected: 0

    })

    // GET ALL APPLICANTS

    const getApplicants = async () => {

        const result = await recruiterAllApplicantsAPI()

        if (result.status === 200) {

            const applicants = result.data.data

            setAllApplicants(applicants)

            // UNIQUE JOBS

            const uniqueJobs = [

                ...new Set(

                    applicants.map(
                        (item) => item?.job?._id
                    )

                )

            ]

            // SHORTLISTED

            const shortlistedCount = applicants.filter(

                (item) => item.status === "Shortlisted"

            ).length

            // REJECTED

            const rejectedCount = applicants.filter(

                (item) => item.status === "Rejected"

            ).length

            setStats({

                totalApplicants: applicants.length,

                totalJobs: uniqueJobs.length,

                shortlisted: shortlistedCount,

                rejected: rejectedCount

            })

        }

    }

    useEffect(() => {

        getApplicants()

    }, [])

    return (

        <RecruiterLayout>

            {/* TITLE */}

            <div className='mb-8'>

                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>

                    Applicants Management

                </h1>

                <p className='text-gray-500 mt-2'>

                    Manage all candidates who applied to your jobs

                </p>

            </div>

            {/* STATS */}

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8'>

                {/* TOTAL APPLICANTS */}

                <div className='bg-white rounded-2xl shadow p-6'>

                    <div className='flex items-center justify-between'>

                        <div>

                            <p className='text-gray-500 text-sm'>

                                Total Applicants

                            </p>

                            <h2 className='text-3xl font-bold mt-2'>

                                {stats.totalApplicants}

                            </h2>

                        </div>

                        <div className='bg-blue-100 p-4 rounded-full'>

                            <FaUsers className='text-blue-600 text-2xl' />

                        </div>

                    </div>

                </div>

                {/* TOTAL JOBS */}

                <div className='bg-white rounded-2xl shadow p-6'>

                    <div className='flex items-center justify-between'>

                        <div>

                            <p className='text-gray-500 text-sm'>

                                Total Jobs

                            </p>

                            <h2 className='text-3xl font-bold mt-2'>

                                {stats.totalJobs}

                            </h2>

                        </div>

                        <div className='bg-purple-100 p-4 rounded-full'>

                            <FaBriefcase className='text-purple-600 text-2xl' />

                        </div>

                    </div>

                </div>

                {/* SHORTLISTED */}

                <div className='bg-white rounded-2xl shadow p-6'>

                    <div className='flex items-center justify-between'>

                        <div>

                            <p className='text-gray-500 text-sm'>

                                Shortlisted

                            </p>

                            <h2 className='text-3xl font-bold mt-2'>

                                {stats.shortlisted}

                            </h2>

                        </div>

                        <div className='bg-green-100 p-4 rounded-full'>

                            <FaUserCheck className='text-green-600 text-2xl' />

                        </div>

                    </div>

                </div>

                {/* REJECTED */}

                <div className='bg-white rounded-2xl shadow p-6'>

                    <div className='flex items-center justify-between'>

                        <div>

                            <p className='text-gray-500 text-sm'>

                                Rejected

                            </p>

                            <h2 className='text-3xl font-bold mt-2'>

                                {stats.rejected}

                            </h2>

                        </div>

                        <div className='bg-red-100 p-4 rounded-full'>

                            <FaUserTimes className='text-red-600 text-2xl' />

                        </div>

                    </div>

                </div>

            </div>

            {/* DESKTOP TABLE */}

            <div className='hidden md:block bg-white rounded-2xl shadow overflow-x-auto'>

                <table className='w-full'>

                    <thead className='bg-blue-600 text-white'>

                        <tr>

                            <th className='p-4 text-left'>
                                Candidate
                            </th>

                            <th className='p-4 text-left'>
                                Job
                            </th>

                            <th className='p-4 text-left'>
                                Status
                            </th>

                            <th className='p-4 text-left'>
                                Applied Date
                            </th>

                            <th className='p-4 text-left'>
                                Resume
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            allApplicants?.length > 0 ?

                                allApplicants.map((item) => (

                                    <tr
                                        key={item._id}
                                        className='border-b hover:bg-gray-50'
                                    >

                                        {/* CANDIDATE */}

                                        <td className='p-4'>

                                            <div className='flex items-center gap-3'>

                                                <img
                                                    src={
                                                        item?.candidate?.picture
                                                            ?
                                                             `http://localhost:3000/uploads/${item?.candidate?.picture}`
                                                            :
                                                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                                    }
                                                    alt=""
                                                    className='w-12 h-12 rounded-full object-cover'
                                                />

                                                <div>

                                                    <h2 className='font-semibold'>

                                                        {item?.candidate?.username}

                                                    </h2>

                                                    <p className='text-sm text-gray-500'>

                                                        {item?.candidate?.email}

                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* JOB */}

                                        <td className='p-4 font-medium'>

                                            {item?.job?.title}

                                        </td>

                                        {/* STATUS */}

                                        <td className='p-4'>

                                            <span className={`
                                                px-3 py-1 rounded-full text-sm
                                                ${item?.status === "Applied"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : item?.status === "Shortlisted"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }
                                            `}>

                                                {item?.status}

                                            </span>

                                        </td>

                                        {/* DATE */}

                                        <td className='p-4 text-gray-500'>

                                            {
                                                new Date(
                                                    item?.createdAt
                                                ).toLocaleDateString()
                                            }

                                        </td>

                                        {/* RESUME */}

                                        <td className='p-4'>

                                            <button
                                                onClick={() =>
                                                    window.open(
                                                        `https://smartjobportal-backend-sk7i.onrender.com/uploads/${item.resume}`
                                                    )
                                                }
                                                className='text-red-500 px-4 py-2 rounded-lg'
                                            >

                                                View CV

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="5"
                                        className='text-center p-8 text-gray-500'
                                    >

                                        No Applicants Found

                                    </td>

                                </tr>
                        }

                    </tbody>

                </table>

            </div>

            {/* MOBILE CARDS */}

            <div className='md:hidden flex flex-col gap-5 mt-5'>

                {
                    allApplicants?.length > 0 ?

                        allApplicants.map((item) => (

                            <div
                                key={item._id}
                                className='bg-white rounded-2xl shadow p-5'
                            >

                                {/* PROFILE */}

                                <div className='flex items-center gap-4 mb-4'>

                                    <img
                                        src={
                                            item?.candidate?.picture
                                                ?
                                                 `http://localhost:3000/uploads/${item?.candidate?.picture}`
                                                :
                                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                        }
                                        alt=""
                                        className='w-16 h-16 rounded-full object-cover'
                                    />

                                    <div>

                                        <h2 className='font-bold text-lg'>

                                            {item?.candidate?.username}

                                        </h2>

                                        <p className='text-sm text-gray-500'>

                                            {item?.candidate?.email}

                                        </p>

                                    </div>

                                </div>

                                {/* DETAILS */}

                                <div className='space-y-3 text-sm'>

                                    <p>

                                        <span className='font-semibold'>
                                            Job:
                                        </span>

                                        {" "}

                                        {item?.job?.title}

                                    </p>

                                    <p>

                                        <span className='font-semibold'>
                                            Status:
                                        </span>

                                        {" "}

                                        {item?.status}

                                    </p>

                                    <p>

                                        <span className='font-semibold'>
                                            Applied:
                                        </span>

                                        {" "}

                                        {
                                            new Date(
                                                item?.createdAt
                                            ).toLocaleDateString()
                                        }

                                    </p>

                                </div>

                                {/* RESUME BUTTON */}

                                <button
                                    onClick={() =>
                                        window.open(`http://localhost:3000/uploads/${item.resume}`)
                                    }
                                    className='text-red-500 mt-2 px-4 py-2 rounded-lg'
                                >
                                    View CV
                                </button>

                            </div>

                        ))

                        :

                        <div className='bg-white rounded-2xl shadow p-8 text-center text-gray-500'>

                            No Applicants Found

                        </div>
                }

            </div>

        </RecruiterLayout>

    )

}

export default Applicant