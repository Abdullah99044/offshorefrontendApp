 
 import {  Link } from "react-router-dom";


function WelcomePage() {
    return (
        <>
            {/* { logIn?.authenticated === true &&  <Navigate to="/Home" replace />  } */}

            <div className="grid-container"> 

                <div  className="grid-item "> 

                    <h1 className="font-sans text-center text-5xl">Welcome to WaveHexaPod dashboard</h1>
                   
                    <p className="font-sans text-center  mt-[20px] text-xl">Welcome to the official AE WaveHexapod dashboard! <br /> Please login for more information about this dashboard.</p>


                    <div className="signInUpContainer">
                        <div className="signInUp-link-background">
                            <Link className="signInUp-link" to="/Login">Login</Link>
                        </div>
                        <div className="signInUp-link-background">
                            <Link className="signInUp-link" to="/Register">Register</Link>
                        </div>
                    </div>
            
                </div>
                <div className="grid-item "> 
                    <img className="img" src="./src/img/hexapod.jpg" alt="test line-up of the wavehexpod"/>
                </div>
            </div>
        </>
    )
};


export default WelcomePage;

