import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[100px] shadow-xl flex justify-center items-center relative">
            <img src="/logo.jpg" alt="logo" className="w-[100px] h-[100px] object-cover border-[3px] rounded-full absolute left-1"></img>
            <Link to = "/" className="text-[25px] font-bold m-1">Home</Link>
            <Link to = "/contact" className="text-[25px] font-bold m-1">contact</Link>
            <Link to = "/gallery" className="text-[25px] font-bold m-1">gallery</Link> 
            <Link to = "/item" className="text-[25px] font-bold m-1" >item</Link>      
                
        </header>  
    )
}