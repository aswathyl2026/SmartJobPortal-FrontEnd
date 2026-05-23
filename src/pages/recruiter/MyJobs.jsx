import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { deleteJobAPI, getAllJobAPI } from "../../services/allAPI"
import Navbar from './Navbar'

function MyJobs() {

  const navigate = useNavigate()

  const user = JSON.parse(sessionStorage.getItem("user"))

  const [activeNav, setActiveNav] = useState("Dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768)

  const [alljob, setAllJob] = useState([])

  const [editId, setEditId] = useState(null)

  const [editData, setEditData] = useState({
    title: "",
    requirements: ""
  })

  const navItems = [
    { label: "Dashboard", icon: "⊞", url: '/recruiter' },
    { label: "My Jobs", icon: "💼", url: "/myjobs" },
    { label: "Applicants", icon: "👥", url: "/applicant" },
    { label: "Profile", icon: "👤", url: "/profile" },
  ]

  const getAllJobs = async () => {
    const result = await getAllJobAPI()
    setAllJob(result.data.data)
  }

  const deleteJob = async (id) => {
    await deleteJobAPI(id)
    getAllJobs()
  }

  const handleEdit = (item) => {

    if (editId === item._id) {
      setEditId(null)
      return
    }

    setEditId(item._id)

    setEditData({
      title: item.title,
      requirements: item.requirements
    })
  }

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    })
  }

  const updateJob = async (id) => {

    console.log(editData)

    // update API call here

    setEditId(null)

    getAllJobs()
  }

  useEffect(() => {

    getAllJobs()

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
      else {
        setSidebarOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)

  }, [])

  return (

    <div className='flex min-h-screen bg-gray-100 relative overflow-hidden'>

      {/* Mobile Overlay */}

      {
        sidebarOpen && window.innerWidth < 768 && (
          <div
            onClick={() => setSidebarOpen(false)}
            className='fixed inset-0 bg-black/40 z-10'
          />
        )
      }

      {/* Sidebar */}

      <aside
        className={`
        bg-white border-r shadow-md z-20 transition-all duration-300
        ${sidebarOpen ? "w-60" : "w-0"}
        md:relative fixed h-screen overflow-hidden
      `}
      >

        <div className='bg-blue-800 p-5 text-white'>

          <div className='flex items-center gap-3'>

            <img
              src="/logo2.png"
              alt="logo"
              className='w-12 h-12 md:w-16 md:h-16'
            />

            <h1 className='text-xl md:text-2xl font-bold'>
              SMART
              <span className='text-blue-300'> JOB</span>
            </h1>

          </div>

        </div>

        <nav className='p-4 flex flex-col gap-2'>

          {
            navItems.map((item) => (

              <button
                key={item.label}
                onClick={() => {

                  setActiveNav(item.label)

                  navigate(item.url)

                  if (window.innerWidth < 768) {
                    setSidebarOpen(false)
                  }
                }}
                className={`
                flex items-center gap-3 p-3 rounded-lg transition
                ${activeNav === item.label
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"}
              `}
              >

                <span>{item.icon}</span>

                <span className='font-medium'>
                  {item.label}
                </span>

              </button>

            ))
          }

        </nav>

        <div className='p-4 mt-auto'>

          <button
            className='flex items-center gap-3 text-red-600 font-semibold'
          >

            ⏻ Logout

          </button>

        </div>

      </aside>

      {/* Main Content */}

      <div className='flex-1 flex flex-col overflow-hidden'>

        {/* Header */}

       
       

        {/* Content */}

        <div className='flex-1 overflow-y-auto p-4 md:p-8'>

          <h1 className='text-2xl md:text-3xl font-bold mb-6'>
            My Jobs
          </h1>

          {/* Desktop Table */}

          <div className='hidden md:block bg-white rounded-2xl shadow overflow-x-auto'>

            <table className='w-full'>

              <thead className='bg-gray-100'>

                <tr>

                  <th className='p-4 text-left'>
                    Job Title
                  </th>

                  <th className='p-4 text-left'>
                    Requirements
                  </th>

                  <th className='p-4 text-left'>
                    Created
                  </th>

                  <th className='p-4 text-center'>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  alljob?.length > 0 ?

                    alljob.map((item) => (

                      <React.Fragment key={item._id}>

                        <tr className='border-t hover:bg-gray-50'>

                          <td className='p-4'>
                            {item.title}
                          </td>

                          <td className='p-4'>
                            {item.requirements}
                          </td>

                          <td className='p-4'>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>

                          <td className='p-4'>

                            <div className='flex justify-center gap-4'>

                              <FaEdit
                                className='text-yellow-600 cursor-pointer'
                                onClick={() => handleEdit(item)}
                              />

                              <FaTrash
                                className='text-red-600 cursor-pointer'
                                onClick={() => deleteJob(item._id)}
                              />

                            </div>

                          </td>

                        </tr>

                        {
                          editId === item._id && (

                            <tr>

                              <td
                                colSpan="4"
                                className='bg-gray-100 p-5'
                              >

                                <div className='flex flex-col gap-3'>

                                  <input
                                    type="text"
                                    name='title'
                                    value={editData.title}
                                    onChange={handleChange}
                                    className='border p-3 rounded-lg'
                                  />

                                  <textarea
                                    name='requirements'
                                    value={editData.requirements}
                                    onChange={handleChange}
                                    className='border p-3 rounded-lg'
                                  />

                                  <div className='flex gap-3'>

                                    <button
                                      onClick={() => updateJob(item._id)}
                                      className='bg-green-600 text-white px-5 py-2 rounded-lg'
                                    >
                                      Update
                                    </button>

                                    <button
                                      onClick={() => setEditId(null)}
                                      className='bg-red-600 text-white px-5 py-2 rounded-lg'
                                    >
                                      Cancel
                                    </button>

                                  </div>

                                </div>

                              </td>

                            </tr>

                          )
                        }

                      </React.Fragment>

                    ))

                    :

                    <tr>

                      <td
                        colSpan="4"
                        className='text-center p-5'
                      >
                        No Jobs Found
                      </td>

                    </tr>
                }

              </tbody>

            </table>

          </div>

          {/* Mobile Cards */}

          <div className='md:hidden flex flex-col gap-4'>

            {
              alljob?.length > 0 ?

                alljob.map((item) => (

                  <div
                    key={item._id}
                    className='bg-white rounded-2xl shadow p-5'
                  >

                    <div className='flex justify-between items-start mb-3'>

                      <div>

                        <h2 className='text-lg font-bold'>
                          {item.title}
                        </h2>

                        <p className='text-sm text-gray-500 mt-1'>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>

                      </div>

                      <div className='flex gap-3'>

                        <FaEdit
                          className='text-yellow-600 cursor-pointer'
                          onClick={() => handleEdit(item)}
                        />

                        <FaTrash
                          className='text-red-600 cursor-pointer'
                          onClick={() => deleteJob(item._id)}
                        />

                      </div>

                    </div>

                    <p className='text-gray-700 text-sm'>
                      {item.requirements}
                    </p>

                    {
                      editId === item._id && (

                        <div className='mt-4 flex flex-col gap-3'>

                          <input
                            type="text"
                            name='title'
                            value={editData.title}
                            onChange={handleChange}
                            className='border p-3 rounded-lg'
                          />

                          <textarea
                            name='requirements'
                            value={editData.requirements}
                            onChange={handleChange}
                            className='border p-3 rounded-lg'
                          />

                          <div className='flex gap-3'>

                            <button
                              onClick={() => updateJob(item._id)}
                              className='bg-green-600 text-white px-4 py-2 rounded-lg'
                            >
                              Update
                            </button>

                            <button
                              onClick={() => setEditId(null)}
                              className='bg-red-600 text-white px-4 py-2 rounded-lg'
                            >
                              Cancel
                            </button>

                          </div>

                        </div>

                      )
                    }

                  </div>

                ))

                :

                <div className='bg-white rounded-xl p-5 text-center shadow'>
                  No Jobs Found
                </div>
            }

          </div>

        </div>

      </div>

    </div>

  )
}

export default MyJobs