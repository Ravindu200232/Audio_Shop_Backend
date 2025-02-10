import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai"; 
import { Link } from "react-router-dom";

let sampleArr = [
    {
      productKey: "P12345",
      productName: "Wireless Speaker",
      productPrice: "149.99",
      productCategory: "Audio",
      productDimension: "10x5x3 inches",
      productDescription: "A high-quality wireless speaker with deep bass and Bluetooth connectivity."
    },
    {
      productKey: "P12346",
      productName: "LED Stage Light",
      productPrice: "89.99",
      productCategory: "Light",
      productDimension: "8x8x6 inches",
      productDescription: "A powerful LED stage light with multiple color modes and remote control."
    },
    {
      productKey: "P12347",
      productName: "Studio Microphone",
      productPrice: "129.99",
      productCategory: "Audio",
      productDimension: "6x2x2 inches",
      productDescription: "A professional studio microphone with noise cancellation and high sensitivity."
    },
    {
      productKey: "P12348",
      productName: "DJ Mixer",
      productPrice: "249.99",
      productCategory: "Audio",
      productDimension: "14x10x4 inches",
      productDescription: "A high-performance DJ mixer with multiple input options and EQ control."
    },
    {
      productKey: "P12349",
      productName: "Disco Ball Light",
      productPrice: "59.99",
      productCategory: "Light",
      productDimension: "7x7x7 inches",
      productDescription: "A rotating disco ball light with dynamic LED patterns for party environments."
    }
  ];
  

  
 
export default function AdminItemPage(){

    const [items,setItems] = useState(sampleArr)
    return(
        <div className="w-full h-full  relative flex">

            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Description</th>
                    <th>Availability</th>
                </thead>
                <tbody>
                    {
                        items.map((product,index)=>{
                         return<tr key={product.index}>
                            <td>{product.productKey}</td>
                            <td>{product.productName}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productCategory}</td>
                            <td>{product.productDimension}</td>
                            <td>{product.productDescription}</td>
                            <td>{}</td>
                         </tr>
                        })
                    }
                </tbody>
            </table>



            <Link to="/admin/item/add"><AiOutlinePlusCircle  className="text-[100px] absolute right-2 bottom-2  hover:text-orange-700 cursor-pointer"/></Link>
           
        </div>
    )
} 