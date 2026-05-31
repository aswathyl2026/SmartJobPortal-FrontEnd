import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { MdDelete, MdSearch, MdRefresh, MdWork } from 'react-icons/md'
import { FaRupeeSign } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { adminGetAllJobsAPI, adminDeleteJobAPI } from '../../services/allAPI'

const typeColor = {
  'full-time': 'bg-blue-100 text-blue-700',
  'part-time': 'bg-purple-100 text-purple-700',
  'remote':    'bg-green-100 text-green-700',
}

function AdminJobs() {
  const [jobs,    setJobs]    = useState([])
  const [search,  setSearch]  = useState('')
  const [loading, setLoading] = useState(true)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await adminGetAllJobsAPI()
      if (res.status === 200) setJobs(res.data.data || res.data || [])
      else toast.error('Failed to fetch jobs.')
    } catch (err) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete job "${title}" permanently? All applications for this job will also be deleted.`)) return
    try {
      const res = await adminDeleteJobAPI(id)
      if (res.status === 200) {
        setJobs(p => p.filter(j => j._id !== id))
        toast.success('Job deleted successfully.')
      } else {
        toast.error('Failed to delete job.')
      }
    } catch (err) {
      toast.error('Something went wrong.')
    }
  }

  const filtered = jobs.filter(j =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.company?.toLowerCase().includes(search.toLowerCase()) ||
    j.location?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Jobs</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{jobs.length} total</span>
          <button onClick={fetchJobs} className="text-gray-400 hover:text-blue-600 transition" title="Refresh">
            <MdRefresh size={20}/>
          </button>
        </div>
      </div>

      <div className="relative mb-5 max-w-sm">
        <MdSearch className="absolute left-3 top-2.5 text-gray-400" size={18}/>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, company or location..."
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <svg className="w-6 h-6 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <span className="text-sm">Loading jobs...</span>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Title','Company','Location','Type','Salary','Posted','Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(j => (
                <tr key={j._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 font-medium text-gray-800">
                      <MdWork className="text-blue-400 flex-shrink-0" size={15}/>
                      {j.title}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{j.company}</td>
                  <td className="px-5 py-4 text-gray-500">{j.location}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${typeColor[j.jobtype?.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>
                      {j.jobtype}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    <span className="flex items-center gap-0.5">
                      <FaRupeeSign size={11}/>{Number(j.salary).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs">
                    {j.createdAt ? new Date(j.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(j._id, j.title)}
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition"
                      title="Delete job"
                    >
                      <MdDelete size={14}/>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No jobs found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </AdminLayout>
  )
}

export default AdminJobs
