import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ToastContainer, toast } from 'react-toastify';
import { registerAPI } from "../services/allAPI";
function Register() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "candidate"
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "atleast 3 characters required").required("Field Required"),
      email: Yup.string().email("Invalid email").required("Field Required"),
      password: Yup.string().required("Field Required")
    }),
    onSubmit: (values, { resetForm }) => {
      handleRegister(values)

    }
  })
  const handleRegister = async (userData) => {
    const result = await registerAPI(userData)
    if (result.status == 201) {
      toast.success("User successfully Registered")

    } else {
      toast.error(result.response)
    }

    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }
  return (
    <div className="flex items-center justify-center py-10 bg-[url('/home.png')] bg-cover bg-center px-4">

      {/* Main Card */}
      <div className="bg-white/80 shadow-lg rounded-2xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center p-10 border-r">

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Create Account
          </h1>

          <p className="text-gray-500 text-center mb-8 leading-7">
            Join us today and <br />
            find your dream job
          </p>

          <img
            src="https://www.dmifinance.in/wp-content/uploads/2025/10/Blog-images-106.png"
            alt="register"
            className="w-80"
          />
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Register
          </h2>

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>

            {/* Full Name */}
            <div className="mb-5">
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                name="username" onChange={formik.handleChange} />
            </div>
            {
              formik.errors.username && formik.touched &&
              <div className="mb-5 text-red-600">{formik.errors.username}</div>
            }

            {/* Email */}
            <div className="mb-5">
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                name="email" onChange={formik.handleChange} />
            </div>
            {
              formik.errors.email && formik.touched &&
              <div className="mb-5 text-red-600">{formik.errors.email}</div>
            }

            {/* Password */}
            <div className="mb-5">
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                name="password" onChange={formik.handleChange} />
            </div>
            {
              formik.errors.password && formik.touched &&
              <div className="mb-5 text-red-600">{formik.errors.password}</div>
            }
            {/* Role Dropdown */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">
                Role
              </label>

              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                onChange={formik.handleChange} onBlur={formik.handleBlur} name="role">
                <option value="">Select Role</option>
                <option value="candidate">Candidate</option>
                <option value="admin">Admin</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose='3000' />
    </div>
  );
}

export default Register;