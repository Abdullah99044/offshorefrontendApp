
import  { useState , useContext}   from "react"
import {  AuthContext  } from './AuthenticationProvider.tsx'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate , Navigate } from "react-router-dom";


const MailConfirmation = () => {

    const  logIn  = useContext(AuthContext);

    const navigate = useNavigate();

    const [ EmcailCode , SetEmcailCode] = useState("");

    const handleInputChangeEmailCode  = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetEmcailCode(event.target.value);
    };

    

    const HandleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        fetch('https://offshorefrontapi.azurewebsites.net/api/Users/CodeConfirmation' , { method : 'PUT' ,
        
        headers : {

            'Content-Type' : 'application/json'} ,

        body : JSON.stringify({

            email : logIn?.GetUserEmail() ,
            code : EmcailCode

        })}).then(Res =>  
            
           {
            
            if(Res.status === 200 ){
 

                return  navigate('/Home');
                
            } 

            if(Res.status === 400 ){

                return toast.error("Code is invalid !");
            }
            
            else {

            return toast.error('Unexpected response status: ' + Res.status);
           
            }
        }).catch(error => {
            console.error('An error occurred while fetching the data:', error);
        });
        
    }

    return (
    
    <>
    
        { logIn?.IsConfirmerd() === "True" &&  <Navigate to="/Home" replace />  }

        <h1> Mail Confirmation </h1>
        
        <ToastContainer />

        <form onSubmit={HandleSubmit}>


            <label>Confirmation code : </label>
            <input className="border border-black rounded-full font-sans text-base w-[500px] pl-[10px] ml-[20px]" type="Text" name="Code" onChange={handleInputChangeEmailCode} />
 
            <button className="border border-black rounded-full font-sans text-center text-base w-[100px] mt-[25px]" type="submit"> Submit </button>
        </form>
    </>

    )

}


export default MailConfirmation;