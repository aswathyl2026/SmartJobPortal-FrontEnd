import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import {
  MdDashboard, MdPeople, MdWork, MdAssignment,
  MdSettings, MdLogout, MdMenu, MdClose, MdBusinessCenter
} from 'react-icons/md'

const navItems = [
  { label: 'Dashboard',    icon: <MdDashboard size={20} />,      path: '/admin' },
  { label: 'Users',        icon: <MdPeople size={20} />,         path: '/admin/users' },
  { label: 'Recruiters',   icon: <MdBusinessCenter size={20} />, path: '/admin/recruiters' },
  { label: 'Jobs',         icon: <MdWork size={20} />,           path: '/admin/jobs' },
  { label: 'Applications', icon: <MdAssignment size={20} />,     path: '/admin/applications' },
  { label: 'Settings',     icon: <MdSettings size={20} />,       path: '/admin/settings' },
]

function AdminLayout({ children }) {
  const location = useLocation()
  const navigate  = useNavigate()
  const dispatch  = useDispatch()
  const user      = useSelector((s) => s.auth.user)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [dropDown, setDropDown]       = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'} transition-all duration-300 bg-white border-r border-gray-100 flex flex-col shadow-sm flex-shrink-0`}>

        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <img src="/logo2.png" alt="" />
          </div>
          <span className="text-lg font-bold text-gray-800">
            Smart<span className="text-blue-600">Job</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all w-full"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            {sidebarOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
          </button>

          {/* Admin profile */}
          <div className="relative">
            <button
              onClick={() => setDropDown(!dropDown)}
              className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                {user?.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.username || 'Admin'}
              </span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropDown && (
              <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-100 z-50 min-w-[140px] py-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
