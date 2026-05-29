import { useState, useEffect } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { createJobAPI, getAIJobAPI } from "../../services/allAPI"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import RecruiterLayout from "./RecruiterLayout"
import { useSelector } from "react-redux"

function AddJob() {

    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)

    const [loadingAI, setLoadingAI] = useState(false)

    const [jobData, setJobData] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        requirements: "",
        jobtype: "full-time",
    })

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value })
    }

    // AI GENERATION — sends all fields for better context
    const getAIJob = async () => {
    if (!jobData.title) {
        toast.error("Enter job title first")
        return
    }

    setLoadingAI(true)
    try {
        const result = await getAIJobAPI({
            title: jobData.title,
            company: jobData.company,
            location: jobData.location,
            requirements: jobData.requirements
        })

        console.log("FULL RESULT:", result)        // ← ADD
        console.log("RESULT.DATA:", result?.data)  // ← ADD

        const content = result?.data?.content

        if (content) {
            setJobData((prev) => ({ ...prev, description: content }))
            toast.success("AI Description Generated!")
        } else {
            toast.error("No AI content received")
        }
    } catch (err) {
        console.error("ERROR:", err?.response?.data || err.message)
        toast.error("AI generation failed")
    } finally {
        setLoadingAI(false)
    }
}

    // ADD JOB
    const handleAddJob = async () => {
        const { title, company, location, description } = jobData

        if (!title || !company || !location || !description) {
            toast.error("Please fill required fields")
            return
        }

        try {
            const result = await createJobAPI(jobData, {
                Authorization: `Bearer ${token}`
            })

            if (result.status === 201) {
                toast.success("Job Added Successfully")
                setJobData({
                    title: "", company: "", location: "",
                    salary: "", description: "", requirements: "", jobtype: "full-time"
                })
                setTimeout(() => navigate("/myjobs"), 1200)
            } else {
                toast.error("Failed to add job")
            }
        } catch (err) {
            toast.error("Server error while adding job")
        }
    }

    return (
        <RecruiterLayout>
            <ToastContainer position="top-right" autoClose={2000} />

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* HEADER */}
                <div className="bg-blue-600 text-white p-5 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Add New Job</h2>
                    <button onClick={() => navigate("/myjobs")} className="text-2xl font-bold">×</button>
                </div>

                {/* FORM */}
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-sm">Job Title <span className="text-red-500">*</span></label>
                            <input
                                name="title"
                                value={jobData.title}
                                onChange={handleChange}
                                placeholder="e.g. React Developer"
                                className="border rounded-lg p-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-sm">Company <span className="text-red-500">*</span></label>
                            <input
                                name="company"
                                value={jobData.company}
                                onChange={handleChange}
                                placeholder="e.g. Google"
                                className="border rounded-lg p-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-sm">Location <span className="text-red-500">*</span></label>
                            <input
                                name="location"
                                value={jobData.location}
                                onChange={handleChange}
                                placeholder="e.g. Bangalore"
                                className="border rounded-lg p-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-sm">Salary</label>
                            <input
                                name="salary"
                                value={jobData.salary}
                                onChange={handleChange}
                                placeholder="e.g. 5 LPA"
                                className="border rounded-lg p-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-sm">Job Type</label>
                            <select
                                name="jobtype"
                                value={jobData.jobtype}
                                onChange={handleChange}
                                className="border rounded-lg p-3 outline-none focus:border-blue-500"
                            >
                                <option value="full-time">Full Time</option>
                                <option value="part-time">Part Time</option>
                                <option value="remote">Work From Home</option>
                                
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-sm">Requirements</label>
                            <input
                                name="requirements"
                                value={jobData.requirements}
                                onChange={handleChange}
                                placeholder="e.g. React, Node.js"
                                className="border rounded-lg p-3 outline-none focus:border-blue-500"
                            />
                        </div>

                    </div>

                    {/* AI BUTTON */}
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={getAIJob}
                            disabled={loadingAI}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition
                                ${loadingAI ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                        >
                            {loadingAI ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Generating...
                                </>
                            ) : "✨ Generate description with AI"}
                        </button>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="flex flex-col gap-1 mt-3">
                        <label className="font-medium text-sm">Job Description <span className="text-red-500">*</span></label>
                        <textarea
                            name="description"
                            value={jobData.description}
                            onChange={handleChange}
                            placeholder="Job description will appear here or type manually..."
                            className="border rounded-lg p-3 outline-none focus:border-blue-500 resize-none"
                            rows={7}
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleAddJob}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Add Job
                        </button>
                        <button
                            onClick={() => navigate("/myjobs")}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>

        </RecruiterLayout>
    )
}

export default AddJob