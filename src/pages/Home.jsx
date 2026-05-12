import React from 'react'
import Header from '../components/Header'
import { FaSearch } from 'react-icons/fa'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <div className="bg-[url('/home.png')] bg-cover bg-center min-h-screen">

  {/* Overlay */}
  <div className="bg-gradient-to-t from-blue-950/80 to-black/80 min-h-screen flex flex-col justify-between">

    <Header />

    {/* Hero Section */}
    <div className="flex flex-col px-6 sm:px-10 md:px-20 lg:px-30 py-20 md:py-32">

      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white py-2 leading-tight'>
        Find Your Dream Job
      </h1>

      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 leading-tight'>
        Build Your Future
      </h1>

      <p className='mt-4 text-base sm:text-lg md:text-xl italic text-white max-w-2xl'>
        Explore thousands of job opportunities and
      </p>

      <p className='text-base sm:text-lg md:text-xl italic text-white max-w-2xl'>
        find the perfect fit for your career
      </p>

      {/* Search Box */}
      <div className="mt-8 bg-white border rounded-xl w-full max-w-4xl p-4 shadow-lg">

        <div className="flex flex-col md:flex-row items-center gap-4">
          
          <input
            type="text"
            placeholder="🔍  Job title or keyword"
            className="w-full outline-none px-4 py-3 border border-black/10 rounded-lg"
          />

          <input
            type="text"
            placeholder="📍 Location"
            className="w-full outline-none px-4 py-3 border  border-black/10 rounded-lg"
          />

          <button className="w-full md:w-auto bg-blue-700 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg">
            Search
          </button>

        </div>

      </div>

    </div>

    {/* Footer */}
    <div className='bg-black/50 backdrop-blur-sm'>
      <Footer />
    </div>

  </div>

</div>

    </>
  )
}

export default Home
