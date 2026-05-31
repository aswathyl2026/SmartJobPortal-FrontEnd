import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { allJobAPI } from '../../../services/allAPI'
import { FaClock, FaRupeeSign } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { TfiBag } from 'react-icons/tfi'

function JobList({ filters }) {
  const [allJob, setAllJob]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [searchParams]            = useSearchParams()
  const isAuthenticated           = useSelector((state) => state.auth.isAuthenticated)

  // URL params from Home search (one-time seed into filters)
  const urlKeyword  = searchParams.get('keyword')  || ''
  const urlLocation = searchParams.get('location') || ''

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
      console.error('Error fetching jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  // Merge URL params with sidebar filters
  // URL params act as defaults when sidebar hasn't been touched
  const effectiveKeyword  = filters.keyword  !== '' ? filters.keyword  : urlKeyword
  const effectiveLocation = filters.location !== '' ? filters.location : urlLocation

  const filteredJobs = allJob.filter((job) => {
    const matchKeyword =
      effectiveKeyword === '' ||
      job.title?.toLowerCase().includes(effectiveKeyword.toLowerCase()) ||
      job.company?.toLowerCase().includes(effectiveKeyword.toLowerCase())

    const matchLocation =
      effectiveLocation === '' ||
      job.location?.toLowerCase().includes(effectiveLocation.toLowerCase())

    const matchJobType =
      filters.jobType.length === 0 ||
      filters.jobType.includes(job.jobtype?.toLowerCase().trim())

    const cleanSalary = (s) => Number(String(s).replace(/[^0-9]/g, ''))
    const matchSalary = cleanSalary(job.salary) <= cleanSalary(filters.salary)

    return matchKeyword && matchLocation && matchJobType && matchSalary
  })

  /* ── Auth guard ─────────────────────────────────────────────── */
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        {/* Lock icon */}
        <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center mb-6">
          <svg className="w-9 h-9 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Restricted</h2>
        <p className="text-slate-500 mb-6 max-w-sm">
          You need to be logged in to browse and apply for jobs.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Login to Continue
        </Link>
        <p className="mt-4 text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register for free
          </Link>
        </p>
      </div>
    )
  }

  /* ── Loading ────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
        <svg className="w-8 h-8 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="text-sm">Loading jobs...</p>
      </div>
    )
  }

  /* ── Active filter summary ──────────────────────────────────── */
  const hasActiveFilters =
    effectiveKeyword || effectiveLocation || filters.jobType.length > 0

  return (
    <div className="px-4 md:px-10 py-5">

      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {hasActiveFilters ? 'Search Results' : 'All Jobs'}
        </h2>
        <span className="text-sm text-slate-500">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-5">
          {effectiveKeyword && (
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-sm px-3 py-1 rounded-full">
              🔍 {effectiveKeyword}
            </span>
          )}
          {effectiveLocation && (
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-sm px-3 py-1 rounded-full">
              📍 {effectiveLocation}
            </span>
          )}
          {filters.jobType.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-sm px-3 py-1 rounded-full capitalize">
              💼 {t}
            </span>
          ))}
        </div>
      )}

      {/* Job cards */}
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow rounded-xl p-5 mb-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="flex items-center gap-2 text-sm mt-1"><FaLocationDot /> {job.location}</p>
              <p className="flex items-center gap-2 text-sm"><TfiBag /> {job.jobtype}</p>
              <p className="flex items-center gap-2 text-sm"><FaRupeeSign /> {job.salary}</p>
              <p className="flex items-center gap-2 text-sm"><FaClock /> {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
            <Link
              to={`/job/${job._id}`}
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition text-center"
            >
              VIEW
            </Link>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No jobs found</h3>
          <p className="text-slate-400 text-sm">Try adjusting your filters or search terms.</p>
        </div>
      )}

    </div>
  )
}

export default JobList
