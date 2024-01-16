
import {  AuthContext  } from './Auth/AuthenticationProvider'
import {  useContext,    useEffect, useState}   from "react"
import {   Navigate , Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  

interface Data {
    golfHoogte        :  string
    windSnelheid      :  string
    windRichting      :  string
    waterHeight       :  string
    airTemperature    :  string
    waterTemperature  :  string
}

function TriFloatPage() {
 

    //Types of data that the program will displayed

    const DataTypes : string[] = ["golfHoogte" , "windSnelheid" , "windRichting" , "waterHoogte"  ,  "airTemperature" , "waterTemperature"];

    //Login context
    const  logIn  = useContext(AuthContext);

  
    //State data
    const [Data , SetData] = useState<Data>({

        golfHoogte            : "Loading....." ,
        windSnelheid          : "Loading....."  ,
        windRichting          : "Loading....."  ,
        waterHeight           : "Loading....."  ,
        airTemperature        : "Loading....."  ,
        waterTemperature      : "Loading....."  
    });

    // Check if user is logged in then fetch the data

    logIn?.authenticated === true &&  useEffect( () => {

        const fetchData = () => { fetch('https://offshorefrontapi.azurewebsites.net/api/RWS_/GetRWS' , { method : 'GET' ,
        
        headers : {

            'Content-Type' : 'application/json'} ,

        }).then(Res =>  
           {
            if(Res.status === 200 ){
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

        }).then( data => {

            SetData({
                golfHoogte            : data.waveHeight ,
                windSnelheid          : data.windSpeed  ,
                windRichting          : data.windDirection  ,
                waterHeight           : data.waterHeight  ,
                airTemperature        : data.airTemperature ,
                waterTemperature      : data.waterTemperature 
            }) 
        
        }).catch(error => {
            console.error('An error occurred while fetching the data:', error);
        });}
    

        fetchData();

        const timer = setInterval(fetchData, 3 * 60 * 1000);

        return () => {
            clearInterval(timer);
        };

    },[]);

    return (

        <>
            
            {/* If user is not logged in the redirect him to "welcome" page  */}
            { logIn?.authenticated === false &&  <Navigate to="/" replace />  }

            <ToastContainer />
            <h1 className="font-sans text-center"> RWS </h1>
        
                  
            <div>
                <div>
                    <table className="tftable" >
                        <thead>
                        <tr>
                            <th>Data type         </th>
                            <th>Data              </th>
                            <th>geschiedenis data </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="font-bold">{DataTypes[0]}</td>
                            <td>: {Data.golfHoogte}</td>
                            <td>
                            <Link to="/Home/TriFloat/History/GolfHoogte">
                                <button>geschiedenis</button>
                            </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">{DataTypes[1]} en {DataTypes[2]} </td>
                            <td>: {Data.windSnelheid} , {Data.windRichting}</td>
                            <td>
                            <Link to="/Home/TriFloat/History/WindSnelHeid">
                                <button>geschiedenis</button>
                            </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">{DataTypes[3]}</td>
                            <td>: {Data.waterHeight}</td>
                            <td>
                            <Link to="/Home/TriFloat/History/WaterHeight">
                                <button>geschiedenis</button>
                            </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">{DataTypes[4]}</td>
                            <td>: {Data.airTemperature}</td>
                            <td>
                            <Link to="/Home/TriFloat/History/AirTemperature">
                                <button>geschiedenis</button>
                            </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">{DataTypes[5]}</td>
                            <td>: {Data.waterTemperature}</td>
                            <td>
                            <Link to="/Home/TriFloat/History/WaterTemperature">
                                <button>geschiedenis</button>
                            </Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <video className="ml-auto w-[600px] mr-[250px] absolute bottom-20 right-10" autoPlay controls loop>
                        <source src="/src/Pages/Videos/trifloats.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </>
    );
};


export default TriFloatPage;

