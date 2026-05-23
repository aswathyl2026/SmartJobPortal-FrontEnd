import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setIn, useFormik } from 'formik'
import * as Yup from 'yup'
import { loginAPI } from "../services/allAPI";
import { ToastContainer, toast } from 'react-toastify';
import {  useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

function Login() {
const navigate=useNavigate()
const dispatch=useDispatch()
  const formik=useFormik({
    initialValues:{
    email:"",
    password:""
    },
    validationSchema:Yup.object({
      email:Yup.string().email("Invalid email").required("Field Required"),
      password:Yup.string().required("Field Required")
    }),
    onSubmit:(values,{resetForm})=>{
      handleLogin(values)
    }
  })

  const handleLogin=async(userData)=>{
    const result=await loginAPI(userData)
    if(result.status==200){
    // 
     // console.log(result.data.data);
     dispatch(loginSuccess({
      token:result.data.data.token,
      user:result.data.data.user
     }))
     
     toast.success(`welcome ${result.data.data.user.username}`)

     setTimeout(() => {
      if(result.data.data.user.role=="admin"){
     navigate('/admin')
      }
      else if(result.data.data.user.role=="recruiter"){
     navigate('/recruiter')
      }
      else{
        navigate('/candidate')
      }
     }, 2000);
      
    }
  }
  return (
 
    <div className="min-h-screen flex items-center justify-center bg-[url('/home.png')] bg-cover bg-center  px-4">
      
      {/* Main Card */}
      <div className="bg-white/80 shadow-lg rounded-2xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center p-10 border-r">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome Back!
          </h1>

          <p className="text-gray-500 mb-8">
            Login to your account
          </p>

          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-security-4488181-3723270.png"
            alt="login"
            className="w-80"
          />
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Login
          </h2>

          {/* Form */}
          <form  onSubmit={formik.handleSubmit}>

            {/* Email */}
            <div className="mb-5">
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              name="email" value={formik.values.email} onChange={formik.handleChange}/>
            </div>
              {
              formik.errors.email && formik.touched.email &&
              <div className="mb-5 text-yellow-400">{formik.errors.email}</div>
            }
            {/* Password */}
            <div className="mb-2">
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              name="password" value={formik.values.password} onChange={formik.handleChange}/>
            </div>
            {
              formik.errors.password && formik.touched.password &&
              <div className="mb-5 text-yellow-400">{formik.errors.password}</div>
            }
            {/* Forgot Password */}
            <div className="text-right mb-6">
              <Link
                to="/forgot-password"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      
     <ToastContainer position='top-center' theme='colored' autoClose='3000' />
    </div>
  );
}

export default Login;