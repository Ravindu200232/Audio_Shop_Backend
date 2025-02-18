import { AiOutlineFacebook, AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between px-6 md:px-12">
        
        {/* Company Section */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h1 className="text-2xl font-semibold mb-4">Company</h1>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Our Services</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h1 className="text-2xl font-semibold mb-4">Support</h1>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h1 className="text-2xl font-semibold mb-4">Get in Touch</h1>
          <p className="text-gray-400">Email: support@audiostore.com</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
          <p className="text-gray-400">Location: 123 Music Street, NY</p>
        </div>

        {/* Social Media Section */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h1 className="text-2xl font-semibold mb-4">Follow Us</h1>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><AiOutlineFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><AiOutlineTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><AiOutlineInstagram /></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 mt-6 text-sm">
        &copy; {new Date().getFullYear()} AudioStore. All rights reserved.
      </div>
    </footer>
  );
}
