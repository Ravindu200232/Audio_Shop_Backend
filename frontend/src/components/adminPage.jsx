
import { BsGraphDown } from "react-icons/bs";
import { CiSpeaker } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { CiUser } from "react-icons/ci";


export default function AdminPage(){
    return(
        <div className="w-full h-screen flex">
    <div className='w-[400px] h-full bg-green-200'>
      <button className='w-full h-[40px] bg-blue-300 text-[25px] font-bold flex justify-around items-center'><BsGraphDown/>Dashboard</button>
      <button className='w-full h-[40px] bg-blue-400 text-[25px] font-bold flex justify-around items-center'><CiBookmarkCheck/>Bookings</button>
      <button className='w-full h-[40px] bg-blue-300 text-[25px] font-bold flex justify-around items-center'><CiSpeaker/>Items</button>
      <button className='w-full h-[40px] bg-blue-400 text-[25px] font-bold flex justify-around items-center'><CiUser/>Users</button>

    </div>
    <div className='w-full bg-red-900'>
      

    </div>
  </div>
    )
}