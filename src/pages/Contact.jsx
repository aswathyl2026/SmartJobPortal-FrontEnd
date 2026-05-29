import React, { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaEnvelope,
  FaLocationArrow,
  FaPaperPlane,
  FaPhone,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const { name, email, message } = form.current;

    if (name.value && email.value && message.value) {
      emailjs
        .sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          form.current,
          {
            publicKey: import.meta.env.VITE_PUBLIC_KEY,
          }
        )
        .then(
          () => {
            toast.success("Thanks for contacting us!");
            name.value = "";
            email.value = "";
            message.value = "";
          },
          (error) => {
            console.log(error.text);
            toast.error("Failed to send message");
          }
        );
    } else {
      toast.warning("Please fill the form completely");
    }
  };

  return (
    <div className="bg-[url('/home.png')] bg-cover bg-center min-h-screen text-white">
      <ToastContainer />

      <div className="bg-gradient-to-t from-blue-950/80 to-black/90 min-h-screen">
        <div className="bg-black/50 backdrop-blur-sm">
          <Header />
        </div>

        {/* CONTENT */}
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-8">
          <h1 className="font-bold text-2xl sm:text-3xl text-center mb-4">
            Contact
          </h1>

          <p className="text-sm sm:text-base text-center max-w-4xl mx-auto">
            Have questions, feedback, or need help finding the perfect job?
            We’d love to hear from you!
          </p>

          {/* CONTACT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-sm sm:text-base">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-full">
                <FaLocationArrow className="text-black" />
              </div>
              <p>123 Main Street, London</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-full">
                <FaPhone className="text-black" />
              </div>
              <p>+1 5666 545562</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-full">
                <FaEnvelope className="text-black" />
              </div>
              <p>contact@smartjob.com</p>
            </div>
          </div>

          {/* FORM + MAP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

            {/* FORM */}
            <div className="bg-gray-100 text-black p-5 sm:p-8 rounded-lg">
              <h1 className="text-xl sm:text-2xl font-semibold text-center">
                Send Us Message
              </h1>

              <form ref={form} onSubmit={sendEmail} className="mt-6">
                <input
                  name="name"
                  placeholder="Name"
                  type="text"
                  className="w-full p-3 mb-4 border rounded"
                />

                <input
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="w-full p-3 mb-4 border rounded"
                />

                <textarea
                  name="message"
                  placeholder="Message"
                  className="w-full p-3 mb-4 border rounded"
                  rows="5"
                />

                <button className="bg-black text-white w-full py-3 flex justify-center items-center gap-2 rounded hover:bg-gray-800">
                  Submit <FaPaperPlane />
                </button>
              </form>
                <ToastContainer position='top-center' theme='colored' autoClose='3000' />
            </div>

            {/* MAP */}
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.4037197129736!2d76.3213563!3d9.4980676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b089b0d3f6f4b0b%3A0x6d0c7b5c9b7f5b0a!2sAlappuzha%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm mt-10">
          <Footer />
         
        </div>
      </div>
    </div>
  );
}

export default Contact;