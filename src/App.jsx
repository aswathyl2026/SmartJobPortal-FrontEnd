import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './auth/Register'
import Login from './auth/Login'
import Contact from './pages/Contact'
import AdminDashboard from './admin/AdminDashboard'
import RecruiterDashboard from './recruiter/RecruiterDashboard'
import CandidateDashboard from './candidate/CandidateDashboard'

function App() {


return(
  <>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/contact' element={<Contact/>}/>

     <Route path='/admin' element={<AdminDashboard/>}/>
    <Route path='/recruiter' element={<RecruiterDashboard/>}/>
    <Route path='/candidate' element={<CandidateDashboard/>}/>
  </Routes>
  </>
)
}

export default App
