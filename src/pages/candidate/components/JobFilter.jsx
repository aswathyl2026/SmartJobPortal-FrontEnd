import React from 'react'

function JobFilter() {

  return (

    <div className='w-full bg-white shadow-lg rounded-xl p-5'>

      {/* Heading */}
      <div className="border-b pb-3 mb-5">

        <h2 className="text-2xl md:text-3xl font-semibold">
          Filters
        </h2>

      </div>

      {/* Filter Content */}
      <div className="flex flex-col gap-6">

        {/* Keyword */}
        <div>

          <h3 className="text-lg font-bold mb-2">
            Keyword
          </h3>

          <input
            type="text"
            className="border border-black/10 rounded-lg w-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder='Enter keyword'
          />

        </div>

        {/* Location */}
        <div>

          <h3 className="text-lg font-bold mb-2">
            Location
          </h3>

          <select
            className="border border-black/10 rounded-lg w-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              Select Location
            </option>

            <option value="trivandrum">
              Trivandrum
            </option>

            <option value="kochi">
              Kochi
            </option>

            <option value="calicut">
              Calicut
            </option>

          </select>

        </div>

        {/* Job Type */}
        <div>

          <h3 className="text-lg font-bold mb-3">
            Job Type
          </h3>

          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                id="fulltime"
                className="w-4 h-4"
              />

              <label htmlFor="fulltime">
                Full Time
              </label>

            </div>

            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                id="parttime"
                className="w-4 h-4"
              />

              <label htmlFor="parttime">
                Part Time
              </label>

            </div>

            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                id="wfh"
                className="w-4 h-4"
              />

              <label htmlFor="wfh">
                Work From Home
              </label>

            </div>

          </div>

        </div>

        {/* Salary Range */}
        <div>

          <h3 className="text-lg font-bold mb-3">
            Salary Range
          </h3>

          <input
            type="range"
            min="10000"
            max="100000"
            className="w-full"
          />

          <div className="flex justify-between text-sm text-gray-500 mt-2">

            <span>₹10k</span>

            <span>₹100k</span>

          </div>

        </div>

        {/* Apply Button */}
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Apply Filters
        </button>

      </div>

    </div>
  )
}

export default JobFilter