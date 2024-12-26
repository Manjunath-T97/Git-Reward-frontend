import React from "react";
import ProfilePage from "../pages/ProfilePage";
import { Outlet } from "react-router-dom";

const ProfileLayout=()=>{
    return(
<div>
<ProfilePage />
<Outlet />
</div>
    )
}

export default ProfileLayout