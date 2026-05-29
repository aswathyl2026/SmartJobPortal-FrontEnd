import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { deleteJobAPI, getAllJobAPI ,editJobAPI} from "../../services/allAPI"
import RecruiterLayout from './RecruiterLayout'

function MyJobs() {

    const [alljob, setAlljob]   = useState([])
    const [editId, setEditId]   = useState(null)
    const [editData, setEditData] = useState({ title: "", requirements: "" })

    const getAllJobs = async () => {
        const result = await getAllJobAPI()
        setAlljob(result.data.data)
    }

    const deleteJob = async (id) => {
        await deleteJobAPI(id)
        getAllJobs()
    }

    const handleEdit = (item) => {
        if (editId === item._id) { setEditId(null); return }
        setEditId(item._id)
        setEditData({ title: item.title, requirements: item.requirements })
    }

    const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value })

   const updateJob = async (id) => {

    const result = await editJobAPI(
        id,
        editData
    )

    if (result.status === 200) {

        setAlljob(

            alljob.map((item) =>

                item._id === id

                    ?

                    {
                        ...item,
                        title: editData.title,
                        requirements: editData.requirements
                    }

                    :

                    item

            )

        )

        // CLOSE EDIT SECTION

        setEditId(null)

    }

}

    useEffect(() => { getAllJobs() }, [])

    return (
        <RecruiterLayout>

            <h1 className='text-2xl font-bold mb-6'>My Jobs</h1>

            {/* Desktop Table */}
            <div className='hidden md:block bg-white rounded-2xl shadow overflow-x-auto'>
                <table className='w-full'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='p-4 text-left'>Job Title</th>
                            <th className='p-4 text-left'>Requirements</th>
                            <th className='p-4 text-left'>Created</th>
                            <th className='p-4 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alljob?.length > 0 ? alljob.map((item) => (
                            <React.Fragment key={item._id}>
                                <tr className='border-t hover:bg-gray-50'>
                                    <td className='p-4'>{item.title}</td>
                                    <td className='p-4'>{item.requirements}</td>
                                    <td className='p-4'>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className='p-4'>
                                        <div className='flex justify-center gap-4'>
                                            <FaEdit className='text-yellow-600 cursor-pointer' onClick={() => handleEdit(item)} />
                                            <FaTrash className='text-red-600 cursor-pointer' onClick={() => deleteJob(item._id)} />
                                        </div>
                                    </td>
                                </tr>
                                {editId === item._id && (
                                    <tr>
                                        <td colSpan="4" className='bg-gray-100 p-5'>
                                            <div className='flex flex-col gap-3'>
                                                <input type="text" name='title' value={editData.title} onChange={handleChange} className='border p-3 rounded-lg' />
                                                <textarea name='requirements' value={editData.requirements} onChange={handleChange} className='border p-3 rounded-lg' />
                                                <div className='flex gap-3'>
                                                    <button onClick={() => updateJob(item._id)} className='bg-green-600 text-white px-5 py-2 rounded-lg'>Update</button>
                                                    <button onClick={() => setEditId(null)} className='bg-red-600 text-white px-5 py-2 rounded-lg'>Cancel</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        )) : (
                            <tr><td colSpan="4" className='text-center p-5'>No Jobs Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className='md:hidden flex flex-col gap-4'>
                {alljob?.length > 0 ? alljob.map((item) => (
                    <div key={item._id} className='bg-white rounded-2xl shadow p-5'>
                        <div className='flex justify-between items-start mb-3'>
                            <div>
                                <h2 className='text-lg font-bold'>{item.title}</h2>
                                <p className='text-sm text-gray-500 mt-1'>{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className='flex gap-3'>
                                <FaEdit className='text-yellow-600 cursor-pointer' onClick={() => handleEdit(item)} />
                                <FaTrash className='text-red-600 cursor-pointer' onClick={() => deleteJob(item._id)} />
                            </div>
                        </div>
                        <p className='text-gray-700 text-sm'>{item.requirements}</p>
                        {editId === item._id && (
                            <div className='mt-4 flex flex-col gap-3'>
                                <input type="text" name='title' value={editData.title} onChange={handleChange} className='border p-3 rounded-lg' />
                                <textarea name='requirements' value={editData.requirements} onChange={handleChange} className='border p-3 rounded-lg' />
                                <div className='flex gap-3'>
                                    <button onClick={() => updateJob(item._id)} className='bg-green-600 text-white px-4 py-2 rounded-lg'>Update</button>
                                    <button onClick={() => setEditId(null)} className='bg-red-600 text-white px-4 py-2 rounded-lg'>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                )) : (
                    <div className='bg-white rounded-xl p-5 text-center shadow'>No Jobs Found</div>
                )}
            </div>

        </RecruiterLayout>
    )
}

export default MyJobs