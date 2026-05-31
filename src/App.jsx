import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Routes>

      {/* ── Public ──────────────────────────────────────── */}
      <Route path='/'         element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login'    element={<Login />} />
      <Route path='/contact'  element={<Contact />} />

      {/* ── Admin ───────────────────────────────────────── */}
      <Route path='/admin'              element={<AdminDashboard />} />
      <Route path='/admin/users'        element={<AdminUsers />} />
      <Route path='/admin/recruiters'   element={<AdminRecruiters />} />
      <Route path='/admin/jobs'         element={<AdminJobs />} />
      <Route path='/admin/applications' element={<AdminApplications />} />
      <Route path='/admin/settings'     element={<AdminSettings />} />

      {/* ── Recruiter ───────────────────────────────────── */}
      <Route path='/recruiter' element={<RecruiterDashboard />} />
      <Route path='/addJob'    element={<AddJob />} />
      <Route path='/myjobs'    element={<MyJobs />} />
      <Route path='/applicant' element={<Applicant />} />
      <Route path='/profile'   element={<Profile />} />

      {/* ── Candidate ───────────────────────────────────── */}
      <Route path='/candidate'   element={<CandidateDashboard />} />
      <Route path='/jobs'        element={<CandidateDashboard />} />
      <Route path='/job/:id'     element={<JobCard />} />
      <Route path='/application' element={<MyApplication />} />
      <Route path='/upload'      element={<UploadDetails />} />

    </Routes>
  )
}

export default App
