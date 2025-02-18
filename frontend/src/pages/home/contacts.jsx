import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";

export default function Contact() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 flex-col bg-gray-50">

      

      {/* Contact Form & Info */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden mt-6">

        {/* Left Section - Contact Info */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-6">
            Feel free to use the form or drop us an email. Old-fashioned phone calls work too!
          </p>

          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <BiPhoneCall className="text-3xl text-[#f0ad38] mr-3" />
              <span className="text-lg font-semibold">0789840996</span>
            </div>

            <div className="flex items-center text-gray-700">
              <AiOutlineMail className="text-3xl text-[#f0ad38] mr-3" />
              <span className="text-lg font-semibold">Ravindu2232@gmail.com</span>
            </div>

            <div className="flex items-center text-gray-700">
              <HiLocationMarker className="text-3xl text-[#f0ad38] mr-3" />
              <span className="text-lg font-semibold">Kahatagasdigiliya, Anuradhapura</span>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h1>

          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0ad38] focus:outline-none"
            />

            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0ad38] focus:outline-none"
            />

            <textarea 
              placeholder="Your Message" 
              rows="4" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0ad38] focus:outline-none"
            ></textarea>

            <button 
              type="submit" 
              className="w-full bg-[#f0ad38] text-white py-3 rounded-lg hover:bg-[#e69500] transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
