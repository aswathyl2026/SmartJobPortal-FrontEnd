import apiService from "../api/apiService";
//register
export const registerAPI=async(userData)=>{
    return await apiService('POST','/register',userData)
}
//login
export const loginAPI=async(userData)=>{
    return await apiService('POST','/login',userData)
}

//all jobes

export const allJobAPI=async()=>{
    return await apiService('GET','/all-job',{})
}
//single job details
export const jobDetailsAPI=async(jobId)=>{
    return await apiService('GET',`/job/${jobId}`,{})
}

//myapplications

export const allMyApplicationAPI=async()=>{
    return await apiService('GET','/alljobs',{})
}

//apply job  
export const applyJobAPI=async(jobId)=>{
    return await apiService('POST',`/apply/${jobId}`,{})
}


