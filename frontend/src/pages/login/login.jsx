import { useState } from "react"
import "./login.css"
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()



      function handleOnSubmit(e){
       e.preventDefault()//default sumbit refres wena eka nawaththganna
       axios.post("http://localhost:3000/api/users/login",
       {email : email,
        password : password
       }).then((res)=>{
        toast.success("Login success")
        const user = res.data.user

        localStorage.setItem("token",res.data.token)


        if(user.role == "admin"){
            navigate("/admin/")

        }else{
            navigate("/")
        }


       }).catch((err)=>{
        toast.error(err.response.data.error)
       })
    }
   
    
    return(
        <form onSubmit={handleOnSubmit}>
            <div className="bg-picture bg- w-full h-screen flex justify-center items-center ">
            <div className="w-[400px] h-[400px] backdrop-blur-2xl rounded-2xl flex flex-col justify-center items-center relative"> 
                <img src="/logo.png" className="w-[100px] f-[100px] object-cover  top-2 absolute rounded-full"></img>
                <span className="text-white text-3xl mb-6">Login</span>
                <input type="email" placeholder="Email" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-xl text-white outline-none?" 
                onChange={(e)=>{
                    setEmail(e.target.value)
                }} value={email}></input>
                <input type="password" placeholder="Password" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white mt-6 text-xl text-white outline-none?"
                onChange={(e)=>{
                    setPassword(e.target.value)
                }} value={password}></input>
                <button className="mt-6 w-[300px] h-[50px] bg-[#010750] text-xl text-white rounded-lg">Login</button>
            </div>
          
        </div>

        </form>
        
    )
}