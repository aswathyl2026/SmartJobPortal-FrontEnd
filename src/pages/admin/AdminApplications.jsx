import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { MdDelete, MdSearch, MdRefresh, MdDownload } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { adminGetAllApplicationsAPI, adminDeleteApplicationAPI } from '../../services/allAPI'

const statusColor = {
  Applied:     'bg-yellow-100 text-yellow-700',
  Shortlisted: 'bg-blue-100 text-blue-700',
  Rejected:    'bg-red-100 text-red-600',
  'Not-Applied': 'bg-gray-100 text-gray-500',
}

function AdminApplications() {
  const [apps,    setApps]    = useState([])
  const [search,  setSearch]  = useState('')
  const [loading, setLoading] = useState(true)

  const fetchApps = async () => {
    setLoading(true)
    try {
      const res = await adminGetAllApplicationsAPI()
      if (res.status === 200) setApps(res.data.data || res.data || [])
      else toast.error('Failed to fetch applications.')
    } catch (err) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchApps() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application permanently?')) return
    try {
      const res = await adminDeleteApplicationAPI(id)
      if (res.status === 200) {
        setApps(p => p.filter(a => a._id !== id))
        toast.success('Application deleted successfully.')
      } else {
        toast.error('Failed to delete application.')
      }
    } catch (err) {
      toast.error('Something went wrong.')
    }
  }

  const filtered = apps.filter(a =>
    a.candidate?.username?.toLowerCase().includes(search.toLowerCase()) ||
    a.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
    a.job?.company?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Applications</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{apps.length} total</span>
          <button onClick={fetchApps} className="text-gray-400 hover:text-blue-600 transition" title="Refresh">
            <MdRefresh size={20}/>
          </button>
        </div>
      </div>

      <div className="relative mb-5 max-w-sm">
        <MdSearch className="absolute left-3 top-2.5 text-gray-400" size={18}/>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by candidate, job or company..."
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
            <span className="text-sm">Loading applications...</span>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Candidate','Job Title','Company','Resume','Applied On','Status','Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => (
                <tr key={a._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {a.candidate?.username || '—'}
                  </td>
                  <td className="px-5 py-4 text-gray-700">{a.job?.title || '—'}</td>
                  <td className="px-5 py-4 text-gray-500">{a.job?.company || '—'}</td>
                  <td className="px-5 py-4">
                    {a.resume ? (
                      <a
                        href={`https://smartjobportal-backend-sk7i.onrender.com/uploads/${a.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-medium"
                      >
                        <MdDownload size={14}/> View
                      </a>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs">
                    {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[a.status] || 'bg-gray-100 text-gray-600'}`}>
                      {a.status || '—'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition"
                      title="Delete application"
                    >
                      <MdDelete size={14}/>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No applications found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </AdminLayout>
  )
}

export default AdminApplications
