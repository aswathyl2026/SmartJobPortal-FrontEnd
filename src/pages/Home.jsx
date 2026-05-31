import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

/* ─── Inline SVG Icons ──────────────────────────────────────────── */
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)
const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
)
const FileIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
)
const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const StarIcon = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

/* ─── Data ──────────────────────────────────────────────────────── */
const stats = [
  { value: '50K+', label: 'Active Jobs' },
  { value: '30K+', label: 'Companies' },
  { value: '2M+',  label: 'Job Seekers' },
  { value: '95%',  label: 'Success Rate' },
]

const steps = [
  { icon: <FileIcon />,      title: 'Create Your Profile',   desc: 'Sign up and build a standout profile that showcases your skills, experience, and ambitions.' },
  { icon: <SearchIcon />,    title: 'Search & Filter Jobs',   desc: 'Browse thousands of curated listings. Filter by role, location, salary, and work type.' },
  { icon: <BriefcaseIcon />, title: 'Apply with One Click',   desc: 'Send your profile to top employers instantly — no repetitive forms, no friction.' },
  { icon: <CheckIcon />,     title: 'Get Hired',              desc: 'Receive offers, schedule interviews, and land your dream role — all in one place.' },
]

const featuredJobs = [
  { company: 'Stripe',  logo: 'S', logoColor: 'bg-indigo-600', title: 'Senior Frontend Engineer', location: 'San Francisco, CA', type: 'Full-time',  salary: '₹1.5L – ₹2L',  tags: ['React', 'TypeScript', 'GraphQL'] },
  { company: 'Notion',  logo: 'N', logoColor: 'bg-gray-800',   title: 'Product Designer',         location: 'Remote',            type: 'Full-time',  salary: '₹1.2L – ₹1.6L', tags: ['Figma', 'Design Systems', 'UX'] },
  { company: 'Vercel',  logo: 'V', logoColor: 'bg-black',      title: 'DevOps Engineer',           location: 'New York, NY',       type: 'Hybrid',     salary: '₹1.3L – ₹1.7L', tags: ['Kubernetes', 'AWS', 'CI/CD'] },
  { company: 'Linear',  logo: 'L', logoColor: 'bg-violet-600', title: 'Backend Engineer',          location: 'Remote',            type: 'Full-time',  salary: '₹1.4L – ₹1.8L', tags: ['Node.js', 'PostgreSQL', 'Redis'] },
]

const testimonials = [
  { name: 'Arjun Mehta',  role: 'Software Engineer at Google',  avatar: 'AM', avatarColor: 'bg-blue-500',  rating: 5, text: 'I landed my dream job at Google within 3 weeks of signing up. The job matching is incredibly accurate — every listing felt tailor-made for me.' },
  { name: 'Priya Nair',   role: 'Product Manager at Swiggy',    avatar: 'PN', avatarColor: 'bg-pink-500',  rating: 5, text: 'The interface is clean, fast, and genuinely useful. I applied to 10 companies in an afternoon and got 4 callbacks. Nothing else comes close.' },
  { name: 'Rohan Iyer',   role: 'UX Designer at Razorpay',      avatar: 'RI', avatarColor: 'bg-green-500', rating: 5, text: 'As a designer I appreciate the attention to detail here. The experience of searching and applying for jobs finally feels premium.' },
]

const categories = [
  { name: 'Technology', count: '12,400 jobs', emoji: '💻' },
  { name: 'Design',     count: '4,200 jobs',  emoji: '🎨' },
  { name: 'Marketing',  count: '6,800 jobs',  emoji: '📣' },
  { name: 'Finance',    count: '5,100 jobs',  emoji: '📊' },
  { name: 'Healthcare', count: '8,300 jobs',  emoji: '🏥' },
  { name: 'Education',  count: '3,600 jobs',  emoji: '📚' },
  { name: 'Sales',      count: '7,200 jobs',  emoji: '🤝' },
  { name: 'Operations', count: '4,900 jobs',  emoji: '⚙️' },
]

/* ─── Component ─────────────────────────────────────────────────── */
function Home() {
  const navigate = useNavigate()
  const [keyword,  setKeyword]  = useState('')
  const [location, setLocation] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const tabs = ['All', 'Remote', 'Full-time', 'Part-time', 'Internship']

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (keyword.trim())  params.set('keyword',  keyword.trim())
    if (location.trim()) params.set('location', location.trim())
    navigate(`/candidate?${params.toString()}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <div className="bg-[url('/home.png')] bg-cover bg-center min-h-screen">
        <div className="bg-gradient-to-t from-blue-950/80 to-black/80 min-h-screen flex flex-col justify-between">

          <Header />

          <div className="flex flex-col px-6 sm:px-10 md:px-20 lg:px-30 py-20 md:py-32">
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white py-2 leading-tight'>
              Find Your Dream Job
            </h1>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 leading-tight'>
              Build Your Future
            </h1>
            <p className='mt-4 text-base sm:text-lg md:text-xl italic text-white max-w-2xl'>
              Explore thousands of job opportunities and
            </p>
            <p className='text-base sm:text-lg md:text-xl italic text-white max-w-2xl'>
              find the perfect fit for your career
            </p>

            {/* ── Search Box ── */}
            <div className="mt-8 bg-white border rounded-xl w-full max-w-4xl p-4 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-4">

                <input
                  type="text"
                  placeholder="🔍  Job title or keyword"
                  className="w-full outline-none px-4 py-3 border border-black/10 rounded-lg"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <input
                  type="text"
                  placeholder="📍 Location"
                  className="w-full outline-none px-4 py-3 border border-black/10 rounded-lg"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 transition text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Search
                </button>

              </div>
            </div>
          </div>

          <div className='bg-black/50 backdrop-blur-sm'>
           
          </div>

        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="bg-blue-700 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-white">{s.value}</p>
              <p className="text-blue-100 mt-1 text-sm tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest text-center mb-2">Browse by Category</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">Explore Job Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/candidate?keyword=${cat.name}`)}
                className="group bg-white hover:bg-blue-700 transition-all duration-300 rounded-2xl p-6 text-left shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <p className="mt-3 font-bold text-slate-800 group-hover:text-white transition-colors">{cat.name}</p>
                <p className="text-sm text-slate-400 group-hover:text-blue-100 transition-colors mt-0.5">{cat.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest text-center mb-2">Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">How It Works</h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-14">
            From signup to offer letter — get hired faster with our streamlined four-step journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-100 z-0" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-700 text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED JOBS ─────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest text-center mb-2">Top Picks</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">Featured Jobs</h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-8">
            Hand-picked listings from the world's most innovative companies.
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === t
                    ? 'bg-blue-700 text-white shadow'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredJobs.map((job, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${job.logoColor} text-white font-bold text-lg flex items-center justify-center flex-shrink-0`}>
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">{job.title}</h3>
                      <p className="text-slate-500 text-sm">{job.company}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                    {job.type}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
                  <span className="flex items-center gap-1"><LocationIcon /> {job.location}</span>
                  <span className="flex items-center gap-1"><ClockIcon /> {job.salary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/candidate')}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap ml-2"
                  >
                    Apply →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/candidate')}
              className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-all px-8 py-3 rounded-lg font-semibold"
            >
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="bg-blue-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest text-center mb-2">Success Stories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">What Our Users Say</h2>
          <p className="text-blue-200 text-center max-w-xl mx-auto mb-14">
            Thousands have found their next role here. Here are a few of their stories.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-blue-900/50 border border-blue-800 rounded-2xl p-7 flex flex-col gap-5 hover:bg-blue-900/80 transition-colors">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} filled={j < t.rating} />
                  ))}
                </div>
                <p className="text-blue-100 text-sm leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-blue-800">
                  <div className={`w-10 h-10 rounded-full ${t.avatarColor} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-blue-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
