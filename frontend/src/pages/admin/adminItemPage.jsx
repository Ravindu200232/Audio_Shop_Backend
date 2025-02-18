import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



export default function AdminItemPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded,setItemLoaded] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if(!itemsLoaded){
      const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setItems(res.data);
        setItemLoaded(true)
      })
      .catch((err) => {
        console.error(err);
      });
    }
    
  }, [itemsLoaded]);

  const handleDelete = (key) => {
    if(window.confirm("Are you sure you want to delete this item?")){

      setItems(items.filter((item) => item.key !== key));
      const token = localStorage.getItem("token");
      axios.delete(`http://localhost:3000/api/products/${key}`,{
      headers : {Authorization: `Bearer ${token}`},
    }).then(
      (res)=>{
        console.log(res.data);
        setItemLoaded(false) // windows.reoload wena eka wenuwata use karanne
      }
    ).catch(
      (err)=>{
        console.log(err);
      }
    )
    }
    
  };

  return (
    <div className="w-full h-full p-6 flex flex-col items-center">
      {!itemsLoaded && <div className="border-b w-[100px] h-[100px]  my-4 border-b-green-500 rounded-full animate-spin">

      </div>}
      {itemsLoaded && <div className="w-full max-w-6xl overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4">Key</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Dimensions</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Availability</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.key} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-4 text-center">{product.key}</td>
                <td className="py-3 px-4 text-center">{product.name}</td>
                <td className="py-3 px-4 text-center">${product.price}</td>
                <td className="py-3 px-4 text-center">{product.category}</td>
                <td className="py-3 px-4 text-center">{product.dimensions}</td>
                <td className="py-3 px-4 text-center">{product.description}</td>
                <td className="py-3 px-4 text-center font-semibold text-{product.availability === 'In Stock' ? 'green-600' : 'red-600'}">
                  {product.availability}
                </td>
                <td className="py-3 px-4 text-center flex justify-center space-x-3">

                  <button className="text-blue-500 hover:text-blue-700" onClick={()=>{
                    navigate('/admin/item/edit',{state:product})//product eke yawanawa
                  }}>
                    <FiEdit size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(product.key)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={20} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

      <Link to="/admin/item/add" className="fixed bottom-6 right-6 text-orange-700 hover:text-orange-500">
        <AiOutlinePlusCircle size={80} />
      </Link>
    </div>
  );
}
