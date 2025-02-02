import { useState } from "react"

export default function Testing(){

   const [count,setCount] = useState(0)
   const [itemName,setItem] = useState("Coconut")

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-9xl">{count}</h1>
            <h1 className="text-9xl">{itemName}</h1>
            

            <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={()=>{
                let newCount = count + 1
                setCount(newCount)
            }}>increment</button>

            <div className="w-full flex justify-evenly p-4">
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={()=>{setItem("Coconut")}}>
                    Coconut
                </button>

                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg " onClick={()=>{setItem("Apple")}}>
                    Apple
                </button>

                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={()=>{setItem("Banana")}}>
                    Banana
                </button>

                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={()=>{setItem("other")}}>
                    other
                </button>
            </div>

        </div>
    )
}