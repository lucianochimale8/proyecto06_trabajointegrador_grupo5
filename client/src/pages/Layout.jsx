import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Header from "../common/Header";


export default function Layout(){
  
    return (
        <>
            <Header/>
            <Navbar/>
            <Outlet/>
        </>
    )
};
