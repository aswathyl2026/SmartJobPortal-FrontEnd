import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaEnvelope, FaLocationArrow, FaPaperPlane, FaPhone } from 'react-icons/fa'
function Contact() {
  return (
    <div className="bg-[url('/home.png')]  bg-cover bg-center min-h-screen text-white">
        <div className='bg-gradient-to-t from-blue-950/80 to-black/97 min-h-scree'>
      <div className='bg-black/50 backdrop-blur-sm'>
      <Header/>
    </div>

      <div className="md:px-20 p-5 my-5">
        <h1 className="font-bold my-5 text-3xl text-center">Contact</h1>
        <p className='text-justify mx-20'>Have questions, feedback, or need help finding the perfect book? We’d love to hear from you! Why Contact Us? Order-related support Book availability inquiries Return/replacement queries Bulk/Institutional purchase requests Author or partnership inquiries. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic veniam id eveniet recusandae pariatur, facilis fuga? Iusto, asperiores modi cum praesentium et, libero nisi eaque harum sed deleniti odio eveniet. Maiores delectus iusto voluptatibus officia eveniet sunt quibusdam mollitia, error fugit laborum dolorum deserunt! Quaerat magni ad, veritatis dolor iusto, aliquam nisi consequatur officiis perferendis unde, maiores quos praesentium voluptatibus. Magni dolores impedit, officia doloribus repellat fuga quos ad natus recusandae sed numquam fugiat, sapiente minima, nam vero incidunt libero earum. Minima praesentium laborum tenetur corporis quod dolorum maxime pariatur.</p>
        <div className="md:grid grid-cols-3 items-center md:px-50 p-20 md:mt-0">
           <div className="flex items-center md:mx-5 my-5">
            <div  style={{height:'50px',width:'50px',borderRadius:'50%'}}  className="flex items-center justify-center bg-gray-200">
             <FaLocationArrow className='text-black'/>
             </div>
             <p className='ms-5 '>123 Main Street, Apt 40, London</p>   
           </div> 

           <div className="flex items-center md:mx-5 my-5">
            <div  style={{height:'50px',width:'50px',borderRadius:'50%'}}  className="flex items-center justify-center bg-gray-200">
             <FaPhone className='text-black'/>
             </div>
             <p className='ms-5 '>+1 5666 545562</p>   
           </div>

           <div className="flex items-center md:mx-5 my-5">
            <div  style={{height:'50px',width:'50px',borderRadius:'50%'}}  className="flex items-center justify-center bg-gray-200">
             <FaEnvelope className='text-black'/>
             </div>
             <p className='ms-5 '>contact@smartjob.com</p>   
           </div>
        </div>
        <div className="md:grid grid-cols-2 p-5 my-5 gap-10 md:px-40">
          <div className="p-5 bg-gray-100 text-center">
            <h1 className="text-2xl font-semi-bold">Send Us Message</h1>
            <form >
              <input placeholder='Name' type="text" className="bg-white w-full p-2 mt-10 mb-5" />
              <input placeholder='Email' type="text" className="bg-white w-full p-2  mb-5" />
              <textarea placeholder="Message"type="text" className="bg-white w-full p-2  mb-5" />
              <div className='my-5' >
                 <button className="bg-black flex justify-center items-center text-white text-lg p-2 w-full">
               Submit <FaPaperPlane className='ms-2'/>
              </button>
              </div>
             
            </form>
          </div>
          <div className="md:mt-0 mt-5">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d88899.59007591529!2d76.07214281031402!3d10.029734290867797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1776675199013!5m2!1sen!2sin" width="100%" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
      <div className='bg-black/50 backdrop-blur-sm'>
      <Footer />
    </div>
    </div></div>
  )
}

export default Contact
