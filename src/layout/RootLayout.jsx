import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout=(props)=>{
    return(
<>
<Navbar login={props.loginBTN} logout={props.logoutBTN}/>
<div className="container">
<Outlet />
</div>
</>
    )
}

export default RootLayout