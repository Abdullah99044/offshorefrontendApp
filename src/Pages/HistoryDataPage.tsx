
import {  AuthContext  } from './Auth/AuthenticationProvider'
import  {  useContext,    useEffect, useState}   from "react"
import {   Navigate , useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Plot from 'react-plotly.js';
  

interface DataPoint {
    time: string;
    elementValue: string;
    location:string;
    date:string;
};

interface WindDataPoint {
    time: string;
    elementValue: string;
    location:string;
    date:string;
    windDirection : string 
}

const HistoryDataPage: React.FC = () => {
    

    //The type of the requested data
    const { DataType } = useParams();
     
    //Login context
    const  logIn  = useContext(AuthContext);

    //Chart data
    const [data, setData] = useState<DataPoint[]>([]);

    const [dataWind, setDataWindData] = useState<WindDataPoint[]>([]);
 
     
    // Check if the user is logged in then fetch the data
    logIn?.authenticated === true &&  useEffect( () => {
        
        
        let url = '';

        if(DataType == 'GolfHoogte'){
            url = 'https://offshorefrontapi.azurewebsites.net/api/HistoryData/Golfhoogte6%252C3';
        }

        if(DataType == 'WindSnelHeid'){
            url = 'https://offshorefrontapi.azurewebsites.net/api/HistoryData/WindSnelheid6%252C3';
        }

        if(DataType == 'WaterHeight'){
            url = 'https://offshorefrontapi.azurewebsites.net/api/HistoryData/WaterHoogte6%252C3';
        }

        if(DataType == 'AirTemperature'){
            url = 'https://offshorefrontapi.azurewebsites.net/api/HistoryData/LuchtTemperatuur6%252C0';
        }

        if(DataType == 'WaterTemperature'){
            url = 'https://offshorefrontapi.azurewebsites.net/api/HistoryData/WaterTemperatuur6%252C0';
        }


        const fetechData = () => { fetch( url , { method : 'GET' , headers : { 'Content-Type' : 'application/json'} }
        ).then(Res =>  {
            
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

        }}).then( data => { 
            

            if(DataType == "WindSnelHeid"){

                setDataWindData(data)
                setData(data)
            }else {
                setData(data)
        
            }     
        
        })
        .catch(error => {
            console.error('An error occurred while fetching the data:', error);
        });}
    

        fetechData();

        
        } , []);

        //Chart layout
       
        const chartData: Partial<Plotly.Data>[] = [
            {
              x: data.map((point) => point.time),
              y: data.map((point) => parseFloat(point.elementValue)),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ];

        let chartLayout = {
        title: `${data[0]?.location} - ${data[0]?.date}`, // Display location and date as the chart title
        xaxis: { title: 'Time' },
        yaxis: { title: 'Element Value' },
        };
        
        
        
         
        

    return (
        <>
            {/* If user is not logged in, redirect to the "welcome" page */}
            {logIn?.authenticated === false && <Navigate to="/" replace />}
        
            <h1>History data of {DataType}:</h1>
        
            <div className="grid-container">
            <div className="grid-item">
                <Plot data={chartData} layout={chartLayout} />
            </div>
        
            <div className="grid-item">
                <ToastContainer />

                <div className='table-container'>
                <table className="tftable" id="apiTable">
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Element Value</th>
                    {DataType === "WindSnelHeid" && <th>Wind direction</th>}
                    </tr>
                </thead>
                <tbody>
                    {DataType === "WindSnelHeid"
                    ? dataWind.map((point, index) => (
                        <tr key={index}>
                            <td>{point.date}</td>
                            <td>{point.time}</td>
                            <td>{point.location}</td>
                            <td>{point.elementValue}</td>
                            <td>{point.windDirection}</td>
                        </tr>
                        ))
                    : data.map((point, index) => (
                        <tr key={index}>
                            <td>{point.date}</td>
                            <td>{point.time}</td>
                            <td>{point.location}</td>
                            <td>{point.elementValue}</td>
                        </tr>
                        ))}
                </tbody>
                </table>
            </div>
            </div>
            </div>
        </>
    );
};


export default HistoryDataPage;

