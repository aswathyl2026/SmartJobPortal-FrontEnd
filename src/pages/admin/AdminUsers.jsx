import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { MdDelete, MdSearch, MdBlock, MdCheckCircle, MdRefresh } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  adminGetAllUsersAPI,
  adminDeleteUserAPI,
  adminToggleBlockUserAPI
} from '../../services/allAPI'

function AdminUsers() {
  const [users,   setUsers]   = useState([])
  const [search,  setSearch]  = useState('')
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await adminGetAllUsersAPI()
      if (res.status === 200) setUsers(res.data.data || res.data || [])
      else toast.error('Failed to fetch users.')
    } catch (err) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

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

  const handleToggleBlock = async (id, currentStatus, name) => {
    const action = currentStatus ? 'Block' : 'Unblock'
    if (!window.confirm(`${action} "${name}"?`)) return
    try {
      const res = await adminToggleBlockUserAPI(id)
      if (res.status === 200) {
        setUsers(p => p.map(u => u._id === id ? { ...u, status: !u.status } : u))
        toast.success(`User ${currentStatus ? 'blocked' : 'unblocked'} successfully.`)
      } else {
        toast.error('Failed to update user status.')
      }
    } catch (err) {
      toast.error('Something went wrong.')
    }
  }

  const filtered = users.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Users</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{users.length} total</span>
          <button onClick={fetchUsers} className="text-gray-400 hover:text-blue-600 transition" title="Refresh">
            <MdRefresh size={20} />
          </button>
        </div>
      </div>

      <div className="relative mb-5 max-w-sm">
        <MdSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
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
            <span className="text-sm">Loading users...</span>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Name','Email','Role','Status','Joined','Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-800">{u.username}</td>
                  <td className="px-5 py-4 text-gray-500">{u.email}</td>
                  <td className="px-5 py-4 capitalize text-gray-600">{u.role}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      u.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}>
                      {u.status ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleBlock(u._id, u.status, u.username)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-white ${
                          u.status ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-green-500 hover:bg-green-600'
                        }`}
                        title={u.status ? 'Block user' : 'Unblock user'}
                      >
                        {u.status ? <MdBlock size={14}/> : <MdCheckCircle size={14}/>}
                      </button>
                      <button
                        onClick={() => handleDelete(u._id, u.username)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition"
                        title="Delete user"
                      >
                        <MdDelete size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">No users found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </AdminLayout>
  )
}

export default AdminUsers
