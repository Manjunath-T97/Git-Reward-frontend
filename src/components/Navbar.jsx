import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import { NavLink, replace, useNavigate } from 'react-router-dom';
import "../indexDB"
import { IndexDB } from '../indexDB';


const Navbar =(props)=>{

    const navigate = useNavigate();
    // const db = IndexDB();

    return(
        <div className='navbar'>
        <img src="https://png.pngtree.com/element_our/sm/20180424/sm_5adebbda32a38.jpg" alt="bug_search" width="50px" height="50px"/>
        <ul>
           <NavLink to="/"><li>Home</li></NavLink> 
            <NavLink to="/About"><li>About</li></NavLink>
            <NavLink to="/Profile"><li>Profile</li></NavLink>
             <NavLink to="/Dashboard"><li>Dashboard</li></NavLink>
        </ul>
        {!localStorage.getItem("accessToken") && !localStorage.getItem("code") ?
        <>
        <button onClick={()=>{navigate( '/', {replace:true});props.login()}}> Login <GitHubIcon /> </button>
        <button onClick={()=>IndexDB()}>DB</button>
        </>
    :
    <button onClick={()=>{props.logout();navigate('/')}}> logout </button>
    }
        </div>
    )
}

export default Navbar