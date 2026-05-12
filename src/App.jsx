import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './auth/Register'
import Login from './auth/Login'
import Contact from './pages/Contact'
import AdminDashboard from './pages/admin/AdminDashboard'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import CandidateDashboard from './pages/candidate/pages/CandidateDashboard'
import JobList from './pages/candidate/components/JobList'
import JobCard from './pages/candidate/components/JobCard'
import MyApplication from './pages/candidate/pages/MyApplication'
import UploadDetails from './pages/candidate/pages/UploadDetails'


function App() {


return(
  <>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/contact' element={<Contact/>}/>
     <Route path='/jobs' element={<JobList/>}/>

     <Route path='/admin' element={<AdminDashboard/>}/>
    <Route path='/recruiter' element={<RecruiterDashboard/>}/>


    <Route path='/candidate' element={<CandidateDashboard/>}/>
    <Route path='/job/:id' element={<JobCard/>}/>
     <Route path='/application' element={<MyApplication/>}/>
     <Route path='/upload' element={<UploadDetails/>}/>
  </Routes>
  </>
)
}

export default App
