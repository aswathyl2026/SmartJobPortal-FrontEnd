import apiService from "../api/apiService";
//register
export const registerAPI=async(userData)=>{
    return await apiService('POST','/register',userData)
}
//login
export const loginAPI=async(userData)=>{
    return await apiService('POST','/login',userData)
}
//google login
export const googleLoginAPI=async (userData)=>{
    return await apiService("POST","/google-login",userData)
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
export const applyJobAPI=async(jobId,resume)=>{
    return await apiService('POST',`/apply/${jobId}`,resume)
}
//all jobes by recruter  /myjobs
export const getAllJobAPI=async()=>{
    return await apiService('GET',`/myjobs`,{})
}

//delete job

export const deleteJobAPI=async(jobId)=>{
    return await apiService('DELETE',`/delete-job/${jobId}`,{})
}
//edit job
export const editJobAPI=async(jobId,userData)=>{
    return await apiService('PUT',`/edit-job/${jobId}`,userData)
}

//create job
export const createJobAPI=async(userData)=>{
    return await apiService('POST',`/create-job`,userData)
}
//view all applicants

export const recruiterAllApplicantsAPI = async () => {

    return await apiService('GET','/recruiter-all-applicants',{})

}




// UPDATE PROFILE

export const updateProfileAPI = async (reqBody, reqHeader) => {

    return await apiService(
        'PUT',
        '/update-profile',
        reqBody,
        reqHeader
    )

}



// RESET PASSWORD

export const resetPasswordAPI = async (reqBody, reqHeader) => {

    return await apiService(
        'PUT',
        '/reset-password',
        reqBody,
        reqHeader
    )

}
//AI job des

export const getAIJobAPI = async (jobData) => {
    return await apiService("POST", '/job-ai', jobData)
}