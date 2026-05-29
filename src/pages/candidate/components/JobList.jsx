import React, { useEffect, useState } from 'react'
import { allJobAPI } from '../../../services/allAPI'
import { FaClock, FaRupeeSign } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6"
import { TfiBag } from "react-icons/tfi"
import { Link } from 'react-router-dom'

function JobList({ filters }) {

  const [allJob, setAllJob] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJob()
  }, [])

  const getJob = async () => {
    try {
      const result = await allJobAPI()

      if (result.status === 200) {
        setAllJob(result.data.data || [])
      }
    } catch (err) {
      console.error("Error fetching jobs:", err)
    } finally {
      setLoading(false)
    }
  }

 
const filteredJobs = allJob.filter(job => {

  const matchKeyword =
    filters.keyword === "" ||
    job.title?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
    job.company?.toLowerCase().includes(filters.keyword.toLowerCase())

  const matchLocation =
    filters.location === "" ||
    job.location?.toLowerCase().includes(filters.location.toLowerCase())

  const matchJobType =
    filters.jobType.length === 0 ||
    filters.jobType.includes(job.jobtype?.toLowerCase().trim())

  const cleanSalary = (s) =>
    Number(String(s).replace(/[^0-9]/g, ""))

  const matchSalary =
    cleanSalary(job.salary) <= cleanSalary(filters.salary)

  return matchKeyword && matchLocation && matchJobType && matchSalary
})
 
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading jobs...
      </div>
    )
  }

  return (
    <div className="px-4 md:px-10 py-5">

      <h2 className="text-2xl font-semibold mb-6">All Jobs</h2>

      {filteredJobs.length > 0 ? (
        filteredJobs.map(job => (
          <div
            key={job._id}
            className="bg-white shadow rounded-xl p-5 mb-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
          >
            <div className="flex-1">

              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>

              <p className="flex items-center gap-2 text-sm mt-1">
                <FaLocationDot /> {job.location}
              </p>

              <p className="flex items-center gap-2 text-sm">
                <TfiBag /> {job.jobtype}
              </p>

              <p className="flex items-center gap-2 text-sm">
                <FaRupeeSign /> {job.salary}
              </p>

              <p className="flex items-center gap-2 text-sm">
                <FaClock /> {new Date(job.createdAt).toLocaleDateString()}
              </p>

            </div>

            <Link
              to={`/job/${job._id}`}
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
            >
              VIEW
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No jobs found
        </p>
      )}

    </div>
  )
}

export default JobList