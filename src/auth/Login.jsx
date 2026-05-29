import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { loginAPI, googleLoginAPI } from "../services/allAPI"
import { ToastContainer, toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../redux/slices/authSlice"
import { jwtDecode } from "jwt-decode"
import { GoogleLogin } from '@react-oauth/google';
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ---------------- NORMAL LOGIN ----------------
  const handleLogin = async (values) => {
    try {
      const result = await loginAPI(values)

      if (result.status === 200) {
        const payload = {
          token: result.data.data.token,
          user: result.data.data.user
        }

        dispatch(loginSuccess(payload))

        toast.success(`Welcome ${payload.user.username}`)

        setTimeout(() => {
          const role = payload.user.role

          if (role === "admin") navigate("/admin")
          else if (role === "recruiter") navigate("/recruiter")
          else navigate("/candidate")
        }, 1500)
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid email or password"
      )
    }
  }

  // ---------------- GOOGLE LOGIN ----------------
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { email, name } = jwtDecode(
        credentialResponse.credential
      )

      const result = await googleLoginAPI({
        username: name,
        email,
        password: "google_auth"
      })

      if (result.status === 200) {
        const payload = {
          token: result.data.token,
          user: result.data.user
        }

        dispatch(loginSuccess(payload))

        toast.success(`Welcome ${payload.user.username}`)

        setTimeout(() => {
          const role = payload.user.role

          if (role === "admin") navigate("/admin")
          else if (role === "recruiter") navigate("/recruiter")
          else navigate("/candidate")
        }, 1500)
      }
    } catch (err) {
      toast.error("Google login failed")
    }
  }

  // ---------------- FORMIK ----------------
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: handleLogin
  })

  return (
    <div className="flex items-center justify-center py-10 bg-[url('/home.png')] bg-cover bg-center px-4 min-h-screen">

      <div className="bg-white/80 shadow-lg rounded-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center p-10 bg-blue-50">
          <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
          <p className="text-gray-500 mb-6">Login to continue</p>

          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-security-4488181-3723270.png"
            className="w-72"
            alt="login"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10">

          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={formik.handleSubmit}>

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border p-3 rounded mb-2"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mb-3">
                {formik.errors.email}
              </p>
            )}

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border p-3 rounded mb-2"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mb-3">
                {formik.errors.password}
              </p>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded mt-3"
            >
              Login
            </button>
          </form>

          {/* GOOGLE LOGIN BUTTON (example placeholder) */}
       <div className="my-5 text-center">
                <p>----------------------------or-----------------------------</p>
                <div className="mt-2 w-full flex justify-center items-center">
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
              </div>

          {/* REGISTER */}
          <p className="text-center mt-5 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}

export default Login