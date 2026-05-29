import React, { useState } from 'react'

function JobFilter({ onFilter }) {

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: [],
    salary: 100000
  })

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleJobType = (e) => {
    const { value, checked } = e.target
    let updated = [...filters.jobType]
    if (checked) {
      updated.push(value)
    } else {
      updated = updated.filter(item => item !== value)
    }
    setFilters({ ...filters, jobType: updated })
  }

  const applyFilters = () => {
    onFilter(filters)
  }

  const resetFilters = () => {
    const reset = { keyword: "", location: "", jobType: [], salary: 100000 }
    setFilters(reset)
    onFilter(reset)
  }

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-5">

      <h2 className="text-2xl font-semibold border-b pb-3 mb-5">Filters</h2>

      {/* KEYWORD */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Keyword</h3>
        <input
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          placeholder="Enter keyword"
        />
      </div>

      {/* LOCATION */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Location</h3>
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        >
          <option value="">Select</option>
          <option value="Trivandrum">Trivandrum</option>
          <option value="Kochi">Kochi</option>
          <option value="Calicut">Calicut</option>
        </select>
      </div>

      {/* JOB TYPE — values must match exactly what's in MongoDB */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Job Type</h3>
        <div className="flex flex-col gap-2">

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value="full-time"     // ✅ matches DB value
              checked={filters.jobType.includes("full-time")}
              onChange={handleJobType}
            />
            Full Time
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value="part-time"     // ✅ matches DB value
              checked={filters.jobType.includes("part-time")}
              onChange={handleJobType}
            />
            Part Time
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value="remote"        // ✅ matches DB value (AddJob saves "remote")
              checked={filters.jobType.includes("remote")}
              onChange={handleJobType}
            />
            Work From Home
          </label>

        

        </div>
      </div>

      {/* SALARY */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Salary</h3>
        <input
          type="range"
          min="10000"
          max="100000"
          value={filters.salary}
          onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
          className="w-full"
        />
        <p className="text-sm text-gray-500">Max: ₹{filters.salary}</p>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={applyFilters}
          className="bg-blue-700 text-white w-full py-2 rounded hover:bg-blue-800 transition"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-200 text-gray-700 w-full py-2 rounded hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>

    </div>
  )
}

export default JobFilter