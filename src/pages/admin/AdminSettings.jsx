import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { MdSave } from 'react-icons/md'

function AdminSettings() {
  const [form, setForm] = useState({ siteName: 'SmartJob', contactEmail: 'admin@smartjob.com', maxJobsPerRecruiter: 10, allowRegistration: true })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // await updateSettingsAPI(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-lg">
        <div className="flex flex-col gap-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input value={form.siteName} onChange={e => setForm({...form, siteName: e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Jobs per Recruiter</label>
            <input type="number" value={form.maxJobsPerRecruiter} onChange={e => setForm({...form, maxJobsPerRecruiter: e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Allow New Registrations</label>
            <button
              onClick={() => setForm({...form, allowRegistration: !form.allowRegistration})}
              className={`w-11 h-6 rounded-full transition-colors ${form.allowRegistration ? 'bg-blue-600' : 'bg-gray-300'} relative`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.allowRegistration ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          <button onClick={handleSave}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium text-sm transition">
            <MdSave size={16}/>
            {saved ? 'Saved!' : 'Save Settings'}
          </button>

        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminSettings
