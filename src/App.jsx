
import { useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/about';
import Dashboard from './pages/Dashboard';
import RootLayout from './layout/RootLayout';
import ProfileLayout from './layout/ProfileLayout';
import Notfound from './components/Notfount';
import { IndexDB } from './indexDB';


/////////////------App-----------------///////////////////

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout loginBTN={gitHubLogin} logoutBTN={()=>logOut()} />}>
             <Route index element={<Home />} />
             <Route path='Profile' element={<ProfileLayout />} />
             <Route path='About' element={<About />} />
             <Route path='Dashboard' element={<Dashboard />} />
             <Route path="*" element={<Notfound/>}/>
        </Route>
    )
  )
///////////////-----------SECRETS--------------------------------//////////////////////////

  const CLIENT_id = "";
  const url = "https://github.com/login/oauth/authorize?client_id=";

 //////////////////////-------------------logIn-------------------///////////////////////////////////

 async  function gitHubLogin(){ 
    window.location.assign(url+CLIENT_id)
    // const response1 = await fetch("https://github.com/login/oauth/authorize?client_id=Ov23liNFnh7TtN6ccHGc");
    // console.log(response1); ------disable cors to use this, coz., cors won't allow direct interaction from frontend to api
  };

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    localStorage.setItem("code", urlParams.get("code"));
    
    const getAccessToken = async ()=>{
      try{
        const response = await fetch("http://localhost:3000/getAccessToken?code="+localStorage.getItem("code"));
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        localStorage.setItem("accessToken", result.access_token);

      }catch(err){console.error('Error fetching data:', err.message)}

/////----------------getData-----------------------///////////////////

      try{
        const response1 =  await fetch("http://localhost:3000/getUserData",{
           method:"GET",
           headers:{
             "Authorization": "Bearer "+ localStorage.getItem("accessToken")
           }
         })
         if (!response1.ok) throw new Error('Network response was not ok');
         const result1 = await response1.json();
       
         IndexDB(result1);

        }catch(err){console.error('Error fetching data:', err.message)}
      
         };

    (localStorage.getItem("code") && (localStorage.getItem("accessToken") === null))  &&  getAccessToken();
    
  }, []);

//////////////----------logOut---------------------------/////////////////

  const logOut=async()=>{
      const token = localStorage.getItem("accessToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("code");
    try{ 
    const response = await fetch("http://localhost:3000/logout?client_id="+CLIENT_id,{
      method:"DELETE",
      headers:{ "access_token" : token }
    });
   const result2 = await response.json();
   console.log(result2);
  }catch(err){console.log('Error in logging out: ',err.message)} 
};

//////////////////////////////////////////////////////////////

  return (
      <div>
        <RouterProvider router={router} />
      </div>
    )
}

export default App


