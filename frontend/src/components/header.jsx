import { BiSearchAlt } from "react-icons/bi"; 
import { AiOutlineShoppingCart } from "react-icons/ai"; 
import { CgProfile } from "react-icons/cg"; 
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[100px] shadow-xl flex justify-center items-center relative">
           
            <div className="w-[100px] h-full  left-3">
            <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] object-cover  rounded-full"></img>
            </div>
            <div className="w-[450px] h-full flex justify-center items-center">
                <div className="w-[390px] h-[40px] bg-gray-300 rounded-3xl flex relative justify-center items-center">
                <BiSearchAlt className="absolute left-2 text-2xl"/>
                <input type="text" className="w-[330px] h-[30px] ml-3 text-[18px] bg-gray-300 outline-none"></input>
                </div>
            </div>
            <div className="w-[300px] h-full flex items-center justify-center">
                <Link to = "/" className="  m-4 text-[18px] hover:text-gray-400">Home</Link>
                <Link to = "/contact" className=" m-4 text-[18px]  hover:text-gray-400">contact</Link>
                <Link to = "/gallery" className=" m-4 text-[18px]  hover:text-gray-400">gallery</Link> 
                <Link to = "/item" className="  m-4 text-[18px]  hover:text-gray-400" >item</Link>
            </div>

            <div className="w-[200px] h-full flex justify-center items-center flex-row relative">
                <CgProfile className="text-[30px] mr-9 ml-4 left-4 absolute  hover:text-gray-400"/>
                <AiOutlineShoppingCart className="text-[30px] ml-8  hover:text-gray-400" />
            </div>
               
        </header>  
    )
}