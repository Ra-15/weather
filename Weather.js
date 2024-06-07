import {useState} from 'react';
import './weather.css';
import axios from 'axios';

const APIKey='E3jPtEzC6J7ot6ZuNUwbKTXgjtmSGcp4'
function Weather(){
   const[city,setCity]= useState("")
   const[weatherdata,setWeatherdata]=useState(null)
   const[error,setError]=useState(null);


   const handleSubmit=async()=>{
    try{
        const respose=await axios.get(`https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${APIKey}`)

        setWeatherdata(respose.data)
        }
        catch(error){
            setError("failed to fetch weather data")
            setWeatherdata(null);
    }
    // e.preventDefault()
    // console.log("city name:"+city)
   };
    return(
        <>
        <div className="container">
            <h1 className="title">Search Weather Condition</h1>
            <div className="inputContainer">
                <input type="text" className="input" placeholder="Enter City Name"  onChange={(e)=>setCity(e.target.value)}/>
                <button className='button' onClick={handleSubmit}>Search</button>
            </div>
           {error&&<p className='error'>{error}</p>}
           {weatherdata&&(
            <div className='weatherContainer'>
                <h2 className="subtitle">{weatherdata.location.name}</h2>
                <p className='temperature'>Temperature:{weatherdata.data.values.temperature}<sup>o</sup>C</p>
                <p className='humidity'>Humidity:{weatherdata.data.values.humidity}%</p>
                <p className='windspeed'>Wind Speed:{weatherdata.data.values.windSpeed}mph</p>
            </div>
           )}
        </div>
        </>
    )
}
export default Weather;