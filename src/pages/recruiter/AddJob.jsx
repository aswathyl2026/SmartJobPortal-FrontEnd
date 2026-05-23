import { useState, useEffect } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { createJobAPI } from '../../services/allAPI'

const navItems = [
  { label: "Dashboard", icon: "⊞", url: "/recruiter" },
  { label: "My Jobs", icon: "💼", url: "/myjobs" },
  { label: "Applicants", icon: "👥", url: "/applicant" },
  { label: "Profile", icon: "👤", url: "/profile" },
];

function AddJob() {

  const navigate = useNavigate()

  const [activeNav, setActiveNav] = useState("Dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth > 768
  );

  const user = JSON.parse(sessionStorage.getItem("user"));



  // JOB STATE

  const [jobData, setJobData] = useState({

    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    jobtype: "full-time"

  })



  // HANDLE CHANGE

  const handleChange = (e) => {

    setJobData({

      ...jobData,

      [e.target.name]: e.target.value

    })

  }



  // ADD JOB

  const handleAddJob = async () => {

    const {

      title,
      company,
      location,
      description

    } = jobData

    if (

      !title ||

      !company ||

      !location ||

      !description

    ) {

      alert("Please fill required fields")

      return

    }

    const token = sessionStorage.getItem("token")

    const reqHeader = {

      Authorization: `Bearer ${token}`

    }

    const result = await createJobAPI(

      jobData,

      reqHeader

    )

    if (result.status === 201) {

      alert("Job Added Successfully")

      setJobData({

        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        requirements: "",
        jobtype: "full-time"

      })

      navigate('/myjobs')

    }

  }



  // RESPONSIVE SIDEBAR

  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth < 768) {

        setSidebarOpen(false)

      }

      else {

        setSidebarOpen(true)

      }

    }

    window.addEventListener("resize", handleResize)

    return () =>

      window.removeEventListener(

        "resize",

        handleResize

      )

  }, [])



  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#F5F6FA",
        overflow: "hidden",
        position: "relative",
      }}
    >

      {/* MOBILE OVERLAY */}

      {
        sidebarOpen && window.innerWidth < 768 && (

          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 5,
            }}
          />

        )
      }



      {/* SIDEBAR */}

      <aside
        style={{
          width: sidebarOpen ? 220 : 0,
          background: "#FFFFFF",
          borderRight: "1px solid #EAEDF2",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
          position: window.innerWidth < 768 ? "fixed" : "relative",
          height: "100vh",
          zIndex: 10,
        }}
      >

        {/* LOGO */}

        <div
          className="bg-blue-800"
          style={{
            padding: "20px",
            borderBottom: "1px solid #F0F2F7",
          }}
        >

          <div
            className="flex items-center"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >

            <img
              style={{
                width: window.innerWidth < 768 ? 50 : 70,
                height: window.innerWidth < 768 ? 50 : 70,
              }}
              src="/logo2.png"
              alt="logo"
            />

            <h1
              style={{
                fontSize: window.innerWidth < 768 ? 18 : 24,
                fontWeight: "bold",
                marginLeft: 10,
                color: "#fff",
              }}
            >

              SMART

              <span style={{ color: "#60A5FA" }}>
                {" "}JOB
              </span>

            </h1>

          </div>

        </div>



        {/* NAVIGATION */}

        <nav style={{ padding: 16, flex: 1 }}>

          {
            navItems.map((item) => {

              const isActive = activeNav === item.label;

              return (

                <button
                  key={item.label}

                  onClick={() => {

                    setActiveNav(item.label)

                    navigate(item.url)

                    if (window.innerWidth < 768) {

                      setSidebarOpen(false)

                    }

                  }}

                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: "none",
                    background: isActive
                      ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)"
                      : "transparent",
                    color: isActive ? "#fff" : "#6B7280",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    marginBottom: 6,
                  }}
                >

                  <span style={{ fontSize: 18 }}>
                    {item.icon}
                  </span>

                  <span>
                    {item.label}
                  </span>

                </button>

              )

            })
          }

        </nav>



        {/* LOGOUT */}

        <div style={{ padding: 16 }}>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "none",
              background: "transparent",
              color: "#EF4444",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >

            <span style={{ fontSize: 18 }}>
              ⏻
            </span>

            Logout

          </button>

        </div>

      </aside>



      {/* MAIN */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflow: "hidden",
        }}
      >

        {/* TOPBAR */}

    



        {/* CONTENT */}

        <div className="flex justify-center p-4 md:p-10 overflow-y-auto">

          <div className='bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden'>

            {/* HEADER */}

            <div className='bg-blue-600 text-white p-5 flex items-center justify-between'>

              <h2 className='text-xl md:text-2xl font-bold'>

                Add New Job

              </h2>

              <button
                onClick={() => navigate('/myjobs')}
                className='text-2xl font-bold'
              >
                ×
              </button>

            </div>



            {/* FORM */}

            <div className='p-5 md:p-8'>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                {/* TITLE */}

                <div>

                  <label className='block mb-2 font-medium'>
                    Job Title
                  </label>

                  <input
                    type="text"
                    name='title'
                    value={jobData.title}
                    onChange={handleChange}
                    placeholder='Frontend Developer'
                    className='w-full border rounded-lg p-3 outline-none focus:border-blue-500'
                  />

                </div>



                {/* COMPANY */}

                <div>

                  <label className='block mb-2 font-medium'>
                    Company
                  </label>

                  <input
                    type="text"
                    name='company'
                    value={jobData.company}
                    onChange={handleChange}
                    placeholder='Google'
                    className='w-full border rounded-lg p-3 outline-none focus:border-blue-500'
                  />

                </div>



                {/* LOCATION */}

                <div>

                  <label className='block mb-2 font-medium'>
                    Location
                  </label>

                  <input
                    type="text"
                    name='location'
                    value={jobData.location}
                    onChange={handleChange}
                    placeholder='Bangalore'
                    className='w-full border rounded-lg p-3 outline-none focus:border-blue-500'
                  />

                </div>



                {/* SALARY */}

                <div>

                  <label className='block mb-2 font-medium'>
                    Salary
                  </label>

                  <input
                    type="text"
                    name='salary'
                    value={jobData.salary}
                    onChange={handleChange}
                    placeholder='5 LPA'
                    className='w-full border rounded-lg p-3 outline-none focus:border-blue-500'
                  />

                </div>



                {/* JOB TYPE */}

                <div>

                  <label className='block mb-2 font-medium'>
                    Job Type
                  </label>

                  <select
                    name='jobtype'
                    value={jobData.jobtype}
                    onChange={handleChange}
                    className='w-full border rounded-lg p-3 outline-none focus:border-blue-500'
                  >

                    <option value="full-time">
                      Full Time
                    </option>

                    <option value="part-time">
                      Part Time
                    </option>

                    <option value="internship">
                      Internship
                    </option>

                    <option value="remote">
                      Remote
                    </option>

                  </select>

                </div>



                {/* REQUIREMENTS */}

                <div>

                  <label className='block mb-2 font-medium'>
                    Requirements
                  </label>

                  <input
                    type="text"
                    name='requirements'
                    value={jobData.requirements}
                    onChange={handleChange}
                    placeholder='React, Node.js'
                    className='w-full border rounded-lg p-3 outline-none focus:border-blue-500'
                  />

                </div>

              </div>



              {/* DESCRIPTION */}

              <div className='mt-5'>

                <label className='block mb-2 font-medium'>
                  Job Description
                </label>

                <textarea
                  name='description'
                  value={jobData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder='Enter job description'
                  className='w-full border rounded-lg p-3 outline-none focus:border-blue-500'
                />

              </div>



              {/* BUTTONS */}

              <div className='flex flex-col sm:flex-row gap-4 mt-8'>

                <button
                  onClick={handleAddJob}
                  className='bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full'
                >

                  Add Job

                </button>

                <button
                  onClick={() => navigate('/myjobs')}
                  className='bg-gray-300 hover:bg-gray-400 text-black py-3 px-6 rounded-lg w-full'
                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddJob