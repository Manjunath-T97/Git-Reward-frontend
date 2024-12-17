
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import GitHubIcon from '@mui/icons-material/GitHub';
import './App.css'
import { useEffect , useState } from 'react';
import Profile from './components/profile';
import '../public/profile.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Button , Form , Card ,Container} from 'react-bootstrap' 

////////////////////////////////////////////////////////////////////////////

function App() {
  const [Rerender , setRerender]=useState(false);
  const [userData , setUserData]=useState({name:"",imgUrl:"", url:"", public:""});
  const [renderProfile , setProfile]=useState(false);
  

//////////////////////////////////////////////////////////////////////////

  const CLIENT_id = "#";
  const url = "https://github.com/login/oauth/authorize?client_id=";

  ///////////////////////////////////////////////////////////////////////////////////////

 async  function gitHubLogin(){ 
    window.location.assign(url+CLIENT_id)
    // const response1 = await fetch("https://github.com/login/oauth/authorize?client_id=Ov23liNFnh7TtN6ccHGc");
    // console.log(response1); ------disable cors to use this, coz., cors won't allow direct interaction from frontend to api
  };

//////////////////////////////////////////////////////////////////////////////////////

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    localStorage.setItem("code", urlParams.get("code"));
    

    const getAccessToken = async ()=>{
      try{
        const response = await fetch("http://localhost:3000/getAccessToken?code="+localStorage.getItem("code"));
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        localStorage.setItem("accessToken", result.access_token);
        // console.log(localStorage.getItem("accessToken"));
        setRerender(!Rerender); //----- To display profile by forcing re-render
      }catch(err){
        console.error('Error fetching data:', err.message);
      }
    };

    (localStorage.getItem("code") && (localStorage.getItem("accessToken") === null))  &&  getAccessToken();
    
  }, []);

////////////////////////////////////////////////////////////////////////////////////////

  async function getUserData(){
   try{
   const response =  await fetch("http://localhost:3000/getUserData",{
      method:"GET",
      headers:{
        "Authorization": "Bearer "+ localStorage.getItem("accessToken")
      }
    })
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();
    
    setUserData({name:result.login, 
                 imgUrl:result.avatar_url, 
                 url:result.html_url,
                public:result.public_repos
              }); // save user data in state

   localStorage.getItem("accessToken")  ? setProfile(!renderProfile) : setRerender(!Rerender);; // to render profile page and if no token go back.
    console.log(result);

  }catch(err){console.error('Error fetching data:', err.message)}
  };

//////////////////////////////////////////////////////////////////

  const loging_Out = ()=>{localStorage.removeItem("accessToken"); setRerender(!Rerender);localStorage.removeItem("code")};

  const logOut=async()=>{
    const token = localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("code");
    setRerender(!Rerender);
    
    
  try{ 
  const response = await fetch("http://localhost:3000/logout?client_id="+CLIENT_id,{
    method:"DELETE",
    headers:{
      "access_token" : token
    }
   });
   const result = await response.json();
   console.log(result);

  // loging_Out();
  
  }catch(err){console.log('Error in logging out: ',err.message)}
  
};

//////////////////////////////////////////////////////////////

  return (
    <>
      <div>
        <Container >
        {((localStorage.getItem("accessToken") === null)&& !Rerender) ?
        
        <Card className="container"><h1>gitReward$</h1>
        <Form><Form.Label>Get Paid for Solving Issues, One Pull Request at a Time</Form.Label>
        <Button className="btn" onClick={gitHubLogin}>GitHub<GitHubIcon /></Button></Form>
        </Card>
        
        
        :
        
        (!renderProfile && localStorage.getItem("accessToken")) ? 
                 <>
                 <h1>you have successfully loged in</h1>
                 <button onClick={getUserData}>View Profile</button>
                 </> 
                
                :

                 <><Profile name={userData.name} 
                            img={userData.imgUrl} 
                            url={userData.url} 
                            public={userData.public}
                            follower={userData.followers}
                            followings={userData.following}/>
                 <button onClick={logOut}>logout</button>
                 </> }
        </Container>
      </div>
    </>
  )
}

export default App

//////////////////////////////////////////

