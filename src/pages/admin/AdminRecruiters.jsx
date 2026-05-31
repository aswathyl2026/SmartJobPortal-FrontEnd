import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { MdDelete, MdSearch, MdBlock, MdCheckCircle, MdRefresh } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  adminGetAllRecruitersAPI,
  adminDeleteRecruiterAPI,
  adminToggleBlockRecruiterAPI
} from '../../services/allAPI'

function AdminRecruiters() {
  const [recruiters, setRecruiters] = useState([])
  const [search,     setSearch]     = useState('')
  const [loading,    setLoading]    = useState(true)

  const fetchRecruiters = async () => {
    setLoading(true)
    try {
      const res = await adminGetAllRecruitersAPI()
      if (res.status === 200) setRecruiters(res.data.data || res.data || [])
      else toast.error('Failed to fetch recruiters.')
    } catch (err) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRecruiters() }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete recruiter "${name}" permanently?`)) return
    try {
      const res = await adminDeleteRecruiterAPI(id)
      if (res.status === 200) {
        setRecruiters(p => p.filter(r => r._id !== id))
        toast.success('Recruiter deleted successfully.')
      } else {
        toast.error('Failed to delete recruiter.')
      }
    } catch (err) {
      toast.error('Something went wrong.')
    }
  }

  const handleToggleBlock = async (id, currentStatus, name) => {
    const action = currentStatus ? 'Block' : 'Unblock'
    if (!window.confirm(`${action} recruiter "${name}"?`)) return
    try {
      const res = await adminToggleBlockRecruiterAPI(id)
      if (res.status === 200) {
        setRecruiters(p => p.map(r => r._id === id ? { ...r, status: !r.status } : r))
        toast.success(`Recruiter ${currentStatus ? 'blocked' : 'unblocked'} successfully.`)
      } else {
        toast.error('Failed to update recruiter status.')
      }
    } catch (err) {
      toast.error('Something went wrong.')
    }
  }

  const filtered = recruiters.filter(r =>
    r.username?.toLowerCase().includes(search.toLowerCase()) ||
    r.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.company?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Recruiters</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{recruiters.length} total</span>
          <button onClick={fetchRecruiters} className="text-gray-400 hover:text-blue-600 transition" title="Refresh">
            <MdRefresh size={20} />
          </button>
        </div>
      </div>

      <div className="relative mb-5 max-w-sm">
        <MdSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search recruiters..."
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
            <span className="text-sm">Loading recruiters...</span>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Name','Email','Company','Status','Joined','Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(r => (
                <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-800">{r.username}</td>
                  <td className="px-5 py-4 text-gray-500">{r.email}</td>
                  <td className="px-5 py-4 text-gray-600">{r.company || '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      r.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}>
                      {r.status ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs">
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleBlock(r._id, r.status, r.username)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-white transition ${
                          r.status ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-green-500 hover:bg-green-600'
                        }`}
                        title={r.status ? 'Block' : 'Unblock'}
                      >
                        {r.status ? <MdBlock size={14}/> : <MdCheckCircle size={14}/>}
                      </button>
                      <button
                        onClick={() => handleDelete(r._id, r.username)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition"
                      >
                        <MdDelete size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">No recruiters found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </AdminLayout>
  )
}

export default AdminRecruiters
