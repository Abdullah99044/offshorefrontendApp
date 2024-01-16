
import  { useState , useContext}   from "react"
import {  AuthContext  } from './Auth/AuthenticationProvider'
import {   Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface TokenData {
    token: string;
    expire: string;
  }

function Login () {

 
    const  logIn  = useContext(AuthContext);

    //Login data

    const [ EmailLogin , SetEmailLogin] = useState("");
    const [ PassowrdLogin , SetPassowrdLogin] = useState("");


    // Handle the state change
 
    const handleInputChangeEmail  = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetEmailLogin(event.target.value);
    };

    const handleInputChangePassword  = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetPassowrdLogin(event.target.value);
    };

       

    //Login fetching
    
    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('https://offshorefrontapi.azurewebsites.net/api/Users/Login' , { method : 'POST' ,
        
        headers : {

            'Content-Type' : 'application/json'} ,

        body : JSON.stringify({

            email : EmailLogin ,
            password : PassowrdLogin

        })}).then(Res =>  
            
           {
            
            if(Res.status === 200 ){

                
                logIn?.SetEmail(EmailLogin);

                return Res.json();
                
            } 

            if(Res.status === 404 ){

               return toast.error("User Doesn't exist ! ");
            }

            if(Res.status === 400 ){

                return toast.error("Passoword is invalid !");
            }
            
            else {

            return toast.error('Unexpected response status: ' + Res.status);
           
            }


        }).then( (data :  TokenData) => {
            
           
            return logIn?.logIn(data);
            
        }).catch(error => {
            console.error('An error occurred while fetching the data:', error);
        });
        
    }

    

    return (

        <>

        { logIn?.authenticated === true &&  <Navigate to="/Home"   />  }
        
        <h1 className="text-center font-sans"> Login </h1>
    
        <ToastContainer />

        <form onSubmit={HandleSubmit} className="text-center block">

            <label htmlFor="email" className="font-sans inline-block mr-[16px]"> Email: </label>
            <input type="text" name="email" value={EmailLogin} onChange={handleInputChangeEmail} placeholder="Email" className="border border-black rounded-full font-sans text-base w-[500px] pl-[10px] ml-[20px]" required  />
            <br/>
            <label htmlFor="PassWord" className="font-sans inline-block mr-[10px]"> Password: </label>
            <input type="password"  name="PassWord" value={PassowrdLogin}  onChange={handleInputChangePassword} placeholder="Password" className="border border-black rounded-full font-sans text-base w-[500px] pl-[10px] mt-[20px]" required  />
            <br />
            <button type="submit" className="border border-black rounded-full font-sans text-center text-base w-[100px] mt-[25px]"> Submit </button>
        </form>

        </>

    )

}


export default Login;
