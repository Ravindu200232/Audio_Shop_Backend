
import { BsGraphDown } from "react-icons/bs";
import { CiSpeaker } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link, Route, Routes } from "react-router-dom";


export default function AdminPage(){
    return(
        <div className="w-full h-screen flex">
    <div className='w-[400px] h-full bg-green-200'>
      <button className='w-full h-[40px] bg-blue-300 text-[25px] font-bold flex justify-around items-center'><BsGraphDown/>Dashboard</button>
      <Link to="/admin/booking" className='w-full h-[40px] bg-blue-400 text-[25px] font-bold flex justify-around items-center'><CiBookmarkCheck/>Bookings</Link>
      <Link to="/admin/item" className='w-full h-[40px] bg-blue-300 text-[25px] font-bold flex justify-around items-center'><CiSpeaker/>Items</Link>
      <button className='w-full h-[40px] bg-blue-400 text-[25px] font-bold flex justify-around items-center'><CiUser/>Users</button>

    </div>
    <div className="w-[calc(100vw-400px)] bg-blue-900">
      <Routes path="/*">
      <Route path="/booking" element={<h1>Booking</h1>}/>
      <Route path="/item" element={<h1>Item</h1>}/>
      </Routes>

      

    </div>
  </div>                                                                                                                                                                                                                                                                                                                                                                                             
    )
}