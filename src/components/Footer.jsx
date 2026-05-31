import React from 'react'
import { FaArrowRight, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <>
    <div className='md:grid grid-cols-3 md:gap-10  p-10'>
       <div>
        <h4 className="font-bold">ABOUT US</h4>
        <p className='text-justify mt-5'>Welcome to SMART JOB, a modern job portal and hiring management platform designed to connect talented candidates with top recruiters efficiently and seamlessly.

Our platform simplifies the recruitment process by providing an easy-to-use environment where job seekers can discover opportunities, apply for jobs, and track their applications, while recruiters can post vacancies, manage applicants, and streamline hiring operations.</p>
       </div>

       <div className='flex flex-col md:mt-0 mt-5'>
        <h4 className="font-bold">OUR MISSION</h4>
        <p className='my-5'>Our mission is to bridge the gap between employers and job seekers by offering a smart, fast, and reliable recruitment solution powered by modern web technologies.</p>
        
       </div>

        <div className='flex flex-col md:mt-0 mt-5'>
        <h4 className="font-bold">FOLLOW US</h4>
        <p className='my-5'>Let us be social</p>
        <div className="flex">
         <FaFacebook/>
         <FaInstagram className='mx-5'/>
         <FaTwitter/>
         <FaEnvelope  className='mx-5'/>
        </div>
       </div>
       </div>
    <p className="bg-black text-center text-white p-2">Copyright © 2026 All rights reserved | This website is made with ❤️ by Aswathy L</p>
    </>
  )
}

export default Footer
