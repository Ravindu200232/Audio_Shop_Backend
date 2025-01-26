import { Link, Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Contact from "./contacts";
import Gallery from "./gallery";
import Item from "./item";
import Home from "./home";
import ErrorNotFound from "./error";

export default function HomePage(){
    return(
        <>
        <Header/>
        <div className="w-full h-[calc(100vh-100px)]">
            <Routes path="/*">
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/item" element={<Item/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/*" element={<ErrorNotFound/>}/>
            </Routes>
        </div>
        </>
    )
}