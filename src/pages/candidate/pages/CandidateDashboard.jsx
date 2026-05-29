import React, { useState } from 'react'
import JobFilter from '../components/JobFilter'
import JobList from '../components/JobList'
import Header from '../components/Header'

function CandidateDashboard() {

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: [],
    salary: 100000
  })

  return (
    <>
      <Header />

      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-1/5 fixed top-[70px] left-0 h-[calc(100vh-70px)] shadow bg-white overflow-y-auto">
          <JobFilter onFilter={setFilters} />
        </div>

        {/* MAIN */}
        <div className="ml-[20%] mt-[70px] w-[80%] h-[calc(100vh-70px)] overflow-y-auto p-4">
          <JobList filters={filters} />
        </div>

      </div>
    </>
  )
}

export default CandidateDashboard