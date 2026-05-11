import apiService from "../api/apiService";
//register
export const registerAPI=async(userData)=>{
    return await apiService('POST','/register',userData)
}
//login
export const loginAPI=async(userData)=>{
    return await apiService('POST','/login',userData)
}