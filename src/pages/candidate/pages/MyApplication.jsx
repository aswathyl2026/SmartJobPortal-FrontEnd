import React, { useEffect, useState } from 'react'
import { allMyApplicationAPI } from '../../../services/allAPI';
import Header from '../components/Header'

function MyApplication() {

    const [allApplication, setAllApplication] = useState([])

    useEffect(() => {
        getApplications()
    }, [])

    const getApplications = async () => {

        const result = await allMyApplicationAPI()

        if (result.status === 200) {
            setAllApplication(result.data.data)
        }

    }

    const getStatusStyle = (status) => {

        switch (status) {

            case "Applied":
                return "bg-blue-100 text-blue-700"

            case "Shortlisted":
                return "bg-green-100 text-green-700"

            case "Rejected":
                return "bg-red-100 text-red-700"

            default:
                return "bg-gray-100 text-gray-700"

        }

    }

    return (

        <>
        
            <Header />

            <div className="min-h-screen bg-gray-50 p-4 md:p-8">

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        My Applications
                    </h2>

                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white shadow rounded-2xl overflow-hidden">

                        <table className="w-full">

                            <thead className="bg-gray-100">

                                <tr className="text-left">

                                    <th className="p-5 font-semibold">
                                        Job Title
                                    </th>

                                    <th className="p-5 font-semibold">
                                        Company
                                    </th>

                                    <th className="p-5 font-semibold">
                                        Applied On
                                    </th>

                                    <th className="p-5 font-semibold">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    allApplication?.length > 0 ?

                                        allApplication.map((item) => (

                                            <tr
                                                key={item?._id}
                                                className="border-t hover:bg-gray-50 transition"
                                            >

                                                <td className="p-5">
                                                    {item?.job?.title || "Job Removed"}
                                                </td>

                                                <td className="p-5">
                                                    {item?.job?.company || "N/A"}
                                                </td>

                                                <td className="p-5">
                                                    {
                                                        item?.createdAt
                                                            ? new Date(item.createdAt).toLocaleDateString()
                                                            : "N/A"
                                                    }
                                                </td>

                                                <td className="p-5">

                                                    <span
                                                        className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusStyle(item?.status)}`}
                                                    >
                                                        {item?.status}
                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                        :

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center p-5 text-gray-500"
                                            >
                                                You have not applied to any jobs
                                            </td>

                                        </tr>
                                }

                            </tbody>

                        </table>

                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">

                        {
                            allApplication?.length > 0 ?

                                allApplication.map((item) => (

                                    <div
                                        key={item?._id}
                                        className="bg-white shadow rounded-2xl p-5"
                                    >

                                        <h3 className="text-lg font-semibold mb-2">
                                            {item?.job?.title || "Job Removed"}
                                        </h3>

                                        <p className="text-gray-600 mb-2">
                                            {item?.job?.company || "N/A"}
                                        </p>

                                        <p className="text-sm text-gray-500 mb-4">
                                            {
                                                item?.createdAt
                                                    ? new Date(item.createdAt).toLocaleDateString()
                                                    : "N/A"
                                            }
                                        </p>

                                        <span
                                            className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusStyle(item?.status)}`}
                                        >
                                            {item?.status}
                                        </span>

                                    </div>

                                ))

                                :

                                <div className="bg-white shadow rounded-2xl p-5 text-center text-gray-500">
                                    You have not applied to any jobs
                                </div>
                        }

                    </div>

                </div>

            </div>

        </>

    )

}

export default MyApplication