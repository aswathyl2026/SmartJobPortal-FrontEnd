import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PageNotFound() {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
  const user            = useSelector((s) => s.auth.user)

  const dashboardPath = () => {
    if (!isAuthenticated) return '/login'
    if (user?.role === 'admin')     return '/admin'
    if (user?.role === 'recruiter') return '/recruiter'
    return '/candidate'
  }

  const dashboardLabel = () => {
    if (!isAuthenticated) return 'Go to Login'
    if (user?.role === 'admin')     return 'Go to Admin Dashboard'
    if (user?.role === 'recruiter') return 'Go to Recruiter Dashboard'
    return 'Go to Jobs'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">

      {/* Big 404 */}
      <div className="relative mb-6">
        <p className="text-[120px] md:text-[160px] font-extrabold text-blue-100 leading-none select-none">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Lock / warning icon */}
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
        {isAuthenticated ? 'Access Denied' : 'Page Not Found'}
      </h1>

      <p className="text-gray-500 max-w-md mb-2">
        {isAuthenticated
          ? `The page you're trying to reach is either unavailable or you don't have permission to access it.`
          : `The page you're looking for doesn't exist or the link may be broken.`
        }
      </p>

      {/* Role hint for logged-in users */}
      {isAuthenticated && (
        <p className="text-sm text-blue-500 mb-8">
          You're logged in as <span className="font-semibold capitalize">{user?.role}</span> — {user?.username}
        </p>
      )}

      {!isAuthenticated && <div className="mb-8" />}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to={dashboardPath()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          {dashboardLabel()}
        </Link>
        <Link
          to="/"
          className="border border-gray-300 text-gray-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition"
        >
          Back to Home
        </Link>
      </div>

    </div>
  )
}

export default PageNotFound
