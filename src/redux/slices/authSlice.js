import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    token: sessionStorage.getItem("token") || null,
    isAuthenticated: sessionStorage.getItem("token") ? true : false
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

            sessionStorage.clear()
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions

export default authSlice.reducer