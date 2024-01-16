
import  { useState , useContext}   from "react"
import {  AuthContext  } from './Auth/AuthenticationProvider'
import {   Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


 

function Register() {


     
    const  logIn  = useContext(AuthContext);

    //Registeren data State
 
    const [FirstName, setFirstName]     = useState("");
    const [LastName, setLastName]       = useState("");
    const [Email , setEmail]            = useState("");
    const [Phone, setPhone]             = useState("");
    const [Password , setPassword]      = useState("");

    // Handle the state change
  

      const handleInputChangeFirstName  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
      };
      
      const handleInputChangeLastName   = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
      };
      
      const handleInputChangeEmail      = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
      };
      
      const handleInputChangePassword   = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
      };
      
      const handleInputChangePhone      = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };


      //Registeren 

      const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('https://offshorefrontapi.azurewebsites.net/api/Users/Register' , { method : 'POST' ,
        
        headers : {

            'Content-Type' : 'application/json'} ,

        body : JSON.stringify({

            FirstName :     FirstName ,
            LastName  :     LastName , 
            Phone     :     Phone , 
            Email     :     Email , 
            Password  :     Password

        })}).then(Res => {
            
            if(Res.status === 200 ){
                
                
                logIn?.SetEmail(Email);

                return <Navigate to="/Login" replace />  ;
                
            } 
            
            else if (Res.status === 400) {

            
              Res.text().then((data) => {
                return toast.error(data);
              });
                

            } else {

           
                return toast.error('Unexpected response status: ' +  Res.status);
           
            }

        }).catch(error => {
            console.error('An error occurred while fetching the data:', error);
             
        });
        
    }
 

    return (

        <>

            { logIn?.authenticated === true &&  <Navigate to="/Home" replace />  }

            <h1 className="text-base font-sans text-center"> Register </h1>

            <ToastContainer />
            <form  className="text-center block" onSubmit={HandleSubmit}>

                <label htmlFor="FirstName" className="font-sans inline-block mr-[10px]"> First name: </label>
                <input type="text" name="FirstName" value={FirstName} onChange={handleInputChangeFirstName} placeholder="First Name" className="border border-black rounded-full font-sans text-base text-justify w-[500px] pl-[10px]" required />
                <br/>
                <label htmlFor="LastName" className="font-sans inline-block mr-[10px]"> Last name: </label>
                <input type="text"  name="LastName" value={LastName}  onChange={handleInputChangeLastName} placeholder="Last Name" className="border border-black rounded-full font-sans text-base text-justify w-[500px] pl-[10px] mt-[20px]" required />
                <br/>
                <label htmlFor="Phone" className="font-sans inline-block mr-[38px]"> Phone: </label>
                <input type="text"  name="Phone" value={Phone}  onChange={handleInputChangePassword} placeholder="Phone" className="border border-black rounded-full font-sans text-base text-justify w-[500px] pl-[10px] mt-[20px]" required />
                <br/>
                <label htmlFor="email" className="font-sans inline-block mr-[38px]"> Email: </label>
                <input type="text" name="email" value={Email} onChange={handleInputChangeEmail} placeholder="Email" className="border border-black rounded-full font-sans text-base text-justify w-[500px] pl-[10px] mt-[20px]" required />
                <br/>
                <label htmlFor="PassWord" className="font-sans inline-block mr-[8px]"> PassWord: </label>
                <input type="password"  name="PassWord" value={Password}  onChange={handleInputChangePhone} placeholder="Password" className="border border-black rounded-full font-sans text-base text-justify w-[500px] pl-[10px] mt-[20px]" required />
                <br/>
                <button type="submit" className="border border-black rounded-full font-sans text-center w-[100px] mt-[25px]"> Submit </button>

            </form>

       
 
        </>

    )


}


export default Register;




