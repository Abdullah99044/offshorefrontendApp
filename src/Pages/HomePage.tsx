

import  {   useContext , useEffect, useState }   from "react"
import {  AuthContext  } from './Auth/AuthenticationProvider'
import {    Link  } from "react-router-dom";
import {  toast , ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Data {
    triFloatName: string;
}

function HomePage() {

    //Login context 
    const  logIn  = useContext(AuthContext);


    //Data that the program will displayed
    const [data , SetData ] = useState<Data[]>([]);
   
   
    useEffect(  () => { 

        //Fetch Trifloats data 

        const fetchTriFloatData = async  () => {
          
            fetch('https://offshorefrontapi.azurewebsites.net/api/TriFloat' , { method : 'GET' , 
            
            headers : {
              
              'Authorization': 'Bearer ' + logIn?.getJwt(),
              'Content-Type' : 'application/json'

            }}).then(Res =>  {  
                
                if(Res.status === 200 ) {
                    return Res.json() ;
                }
                else { 
                    return toast.error(" Error ! " +  Res.status );
                }
            })
            .then( data => SetData(data))
            .catch(error => {
                console.error('An error occurred while fetching the data:', error);
            });}; 

        //Fetch user data 

        const fetechUserData = () => {

            fetch('https://offshorefrontapi.azurewebsites.net/api/Users/GetUserData?email=' + logIn?.GetUserEmail() ,
            { 
              method : 'GET' ,
              headers : {
                
                'Authorization': 'Bearer ' + logIn?.getJwt(), 
                'Content-Type' : 'application/json' 
            
              }}).then(response => {
                
                if (response.ok) {
                  return response.text();
                }else {
                  throw new Error('Network response was not ok.');
                }

            }).then(data => {
            // Handle the string data
            logIn?.SetIsConfirmerd(data)
            }).catch(error => {
            // Handle any errors
            console.error(error);
            });
        }


        return () => {

            fetchTriFloatData();

            fetechUserData();
  
        };},[ ]);
    
  
    return (
        <div>
          {logIn?.IsConfirmerd() === "True" && (
            <>
              <ToastContainer />
            
              <h2 className="font-sans text-center">Welcome user</h2>
              <div className="text-center font-sans" >
                {data.map((post, index) => (
                  <div key={index}>
                    <Link className="font-bold font-sans" to={"/Home/TriFloat/" + post.triFloatName} key={index}>
                      {index + " : " + post.triFloatName}
                    </Link>
                    <br />
                  </div>
                ))}
              </div>


              <div className="grid-container">
                <div>
                  <p className="grid-item">
                    The AE WaveHexaPod is a project made possible by Van Bodegraven Electric Motors, ABB, MDIM, and AE group.
                    <br />
                    The WaveHexaPod is a robotic construction attached to a trifloater on the North Sea.
                    <br />
                    Since it is offshore, we cannot provide test data; we had to find another way to test the HexaPod as realistically as possible.
                    <br />
                    That is why we made an animation so we can provide the best information about the most ideal wave.
                    <br />
                    Choose one of the names of the trifloaters to see the data.
                  </p>
                </div>
                <div className="grid-item grid-container">
                  <div className="grid-item"> 
                      <img className=" img" src="./src/img/hexapod.jpg" alt="the wavehexapod test formation" />
                  </div>
                  <div className="grid-item">
                    <img className=" img" src="./src/img/robotarm.jpg" alt="robotarm" />
                  </div>
                </div>
              </div>
            </>
          )}

          {logIn?.IsConfirmerd() === "False" && (
            <div>
              <h1>Confirm your email first</h1>
            </div>
          )}

        </div>
      );

};


export default HomePage;

