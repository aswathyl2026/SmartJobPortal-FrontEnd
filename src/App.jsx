import { Routes, Route, Navigate } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import { useSelector } from 'react-redux'
import './App.css'

import Home               from './pages/Home'
import Register           from './auth/Register'
import Login              from './auth/Login'
import Contact            from './pages/Contact'

import AdminDashboard     from './pages/admin/AdminDashboard'
import AdminUsers         from './pages/admin/AdminUsers'
import AdminRecruiters    from './pages/admin/AdminRecruiters'
import AdminJobs          from './pages/admin/AdminJobs'
import AdminApplications  from './pages/admin/AdminApplications'
import AdminSettings      from './pages/admin/AdminSettings'

import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import MyJobs             from './pages/recruiter/MyJobs'
import AddJob             from './pages/recruiter/AddJob'
import Applicant          from './pages/recruiter/Applicant'
import Profile            from './pages/recruiter/Profile'

import CandidateDashboard from './pages/candidate/pages/CandidateDashboard'
import JobCard            from './pages/candidate/components/JobCard'
import MyApplication      from './pages/candidate/pages/MyApplication'
import UploadDetails      from './pages/candidate/pages/UploadDetails'

// ── Protected Route — must be logged in ─────────────────────────
function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// ── Role Route — must be logged in AND have the right role ───────
function RoleRoute({ children, role }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
  const user            = useSelector((s) => s.auth.user)

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user?.role !== role) return <Navigate to="/" replace />

  return children
}

// ── Guest Route — logged-in users are redirected away ────────────
function GuestRoute({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
  const user            = useSelector((s) => s.auth.user)

  if (!isAuthenticated) return children

  // Already logged in → send to their dashboard
  if (user?.role === 'admin')     return <Navigate to="/admin"     replace />
  if (user?.role === 'recruiter') return <Navigate to="/recruiter" replace />
  return <Navigate to="/candidate" replace />
}

function App() {
  return (
    <Routes>

      {/* ── Public ──────────────────────────────────────────────── */}
      <Route path='/'        element={<Home />} />
      <Route path='/contact' element={<Contact />} />

      {/* Auth pages — redirect away if already logged in */}
      <Route path='/login'    element={<GuestRoute><Login /></GuestRoute>} />
      <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />

      {/* ── Admin (role: admin only) ─────────────────────────────── */}
      <Route path='/admin'              element={<RoleRoute role="admin"><AdminDashboard /></RoleRoute>} />
      <Route path='/admin/users'        element={<RoleRoute role="admin"><AdminUsers /></RoleRoute>} />
      <Route path='/admin/recruiters'   element={<RoleRoute role="admin"><AdminRecruiters /></RoleRoute>} />
      <Route path='/admin/jobs'         element={<RoleRoute role="admin"><AdminJobs /></RoleRoute>} />
      <Route path='/admin/applications' element={<RoleRoute role="admin"><AdminApplications /></RoleRoute>} />
      <Route path='/admin/settings'     element={<RoleRoute role="admin"><AdminSettings /></RoleRoute>} />

      {/* ── Recruiter (role: recruiter only) ────────────────────── */}
      <Route path='/recruiter' element={<RoleRoute role="recruiter"><RecruiterDashboard /></RoleRoute>} />
      <Route path='/addJob'    element={<RoleRoute role="recruiter"><AddJob /></RoleRoute>} />
      <Route path='/myjobs'    element={<RoleRoute role="recruiter"><MyJobs /></RoleRoute>} />
      <Route path='/applicant' element={<RoleRoute role="recruiter"><Applicant /></RoleRoute>} />
      <Route path='/profile'   element={<RoleRoute role="recruiter"><Profile /></RoleRoute>} />

      {/* ── Candidate (role: candidate only) ────────────────────── */}
      <Route path='/candidate'   element={<RoleRoute role="candidate"><CandidateDashboard /></RoleRoute>} />
      <Route path='/jobs'        element={<RoleRoute role="candidate"><CandidateDashboard /></RoleRoute>} />
      <Route path='/job/:id'     element={<RoleRoute role="candidate"><JobCard /></RoleRoute>} />
      <Route path='/application' element={<RoleRoute role="candidate"><MyApplication /></RoleRoute>} />
      <Route path='/upload'      element={<RoleRoute role="candidate"><UploadDetails /></RoleRoute>} />

      {/* ── 404 Fallback ────────────────────────────────────────── */}
      <Route path='*' element={<PageNotFound />} />

    </Routes>
  )
}

export default App
