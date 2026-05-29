import { createSlice } from "@reduxjs/toolkit"

let user = null

try {
  user = JSON.parse(sessionStorage.getItem("user"))
} catch (e) {
  user = null
}

const initialState = {
  user: user,
  token: sessionStorage.getItem("token") || null,
  isAuthenticated: !!sessionStorage.getItem("token")
}

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true

      sessionStorage.setItem("token", action.payload.token)
      sessionStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      )
    },

    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false

      sessionStorage.removeItem("token")
      sessionStorage.removeItem("user")
    }
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer