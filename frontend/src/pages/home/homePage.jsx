import { Link, Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Contact from "./contacts";
import Gallery from "./gallery";
import Item from "./item";
import Home from "./home";
import ErrorNotFound from "./error";
import Footer from "../../components/footer";

export default function HomePage(){
    return(
        <>
        <header className="fixed top-0 left-0 w-full bg-white shadow-xl z-50">
          <Header />
        </header>
        <div className="w-full h-[calc(100vh-100px)]">
            <Routes path="/*">
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/item" element={<Item/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/*" element={<ErrorNotFound/>}/>
            </Routes>
        </div>
       <footer><Footer/></footer>
        </>
    )
}