import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import "../getIndexDB"
import { getIndexDB } from '../getIndexDB';

const ProfilePage =(props)=>{

    const userData = getIndexDB();

    const [render, setRender] = useState(false);

    const navigate = useNavigate();

    return( !render?
        
        <div>
        <h1>profile page</h1>
        <div className="profileBTN">
         { localStorage.getItem("accessToken") ? <button onClick={()=>{setRender(!render)}}>view</button> 
         :
         <p>login to view profile</p> }
        </div>
        </div>

        :

        <div className='profileBox'>
        <button onClick={()=>setRender(!render)}> &#x21A9; </button>
        <button onClick={()=>navigate('/')}>home</button>
        <Card name={userData.name} img={userData.avatar} link={userData.url}/>
        </div>
        
    
    )
}

export default ProfilePage