import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { MdAssignment, MdDelete } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  adminGetStatsAPI,
  adminGetAllUsersAPI,
  adminDeleteUserAPI,
  adminToggleBlockUserAPI
} from '../../services/allAPI'

const StatCard = ({ label, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-1">
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-3xl font-bold ${color}`}>
      {value ?? <span className="text-gray-300 text-lg animate-pulse">—</span>}
    </p>
  </div>
)

function AdminDashboard() {
  const [stats,   setStats]   = useState(null)
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [statsRes, usersRes] = await Promise.all([
        adminGetStatsAPI(),
        adminGetAllUsersAPI()
      ])
      if (statsRes.status === 200) setStats(statsRes.data.data || statsRes.data)
      else toast.error('Failed to load stats.')
      if (usersRes.status === 200) setUsers(usersRes.data.data || usersRes.data || [])
      else toast.error('Failed to load users.')
    } catch (err) {
      toast.error('Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" permanently?`)) return
    try {
      const res = await adminDeleteUserAPI(id)
      if (res.status === 200) {
        setUsers(p => p.filter(u => u._id !== id))
        toast.success('User deleted successfully.')
      } else {
        toast.error('Failed to delete user.')
      }
    } catch (err) {
      toast.error('Something went wrong.')
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-2 mb-6">
        <MdAssignment className="text-blue-600" size={22} />
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users"        value={stats?.totalUsers}        color="text-gray-800" />
        <StatCard label="Total Recruiters"   value={stats?.totalRecruiters}   color="text-gray-800" />
        <StatCard label="Total Jobs"         value={stats?.totalJobs}         color="text-green-600" />
        <StatCard label="Total Applications" value={stats?.totalApplications} color="text-gray-800" />
      </div>

      {/* Recent Users Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Recent Users</h2>
          {!loading && <span className="text-xs text-gray-400">{users.length} users</span>}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 gap-3">
            <svg className="w-6 h-6 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <span className="text-sm">Loading...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Name','Email','Role','Status','Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.slice(0, 10).map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{user.username}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 capitalize text-gray-600">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        user.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}>
                        {user.status ? 'Active' : 'Blocked'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(user._id, user.username)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        title="Delete user"
                      >
                        <MdDelete size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-12 text-gray-400">No users found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </AdminLayout>
  )
}

export default AdminDashboard
