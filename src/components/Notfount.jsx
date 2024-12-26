import React from "react";
import { useNavigate } from "react-router-dom";

const Notfound =()=>{

    const navigate = useNavigate();

return(
<div>
    <h2>404 | page Not found</h2>
    <br />
    <button onClick={()=>navigate('/')}>Go To Home Page</button>
</div>
)

}

export default Notfound