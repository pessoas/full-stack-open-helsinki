import  React, {useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [climate, setClimate] = useState([])

    const param = {
        access_key: ''
      }

      const www = () => {
          console.log('weather effect')
          axios.get(`http://api.weatherstack.com/current?access_key=${param.access_key}&query=${capital}`)
          .then(response => {
            console.log(response.data)
            setClimate(response.data)
          })
      }
      www()
      //console.log(climate)
      
    return(
        <div>
            <h2>Weather in {capital}</h2>
            <p><strong>Temperature:</strong>{climate.current.temperature}</p>
            <p>{climate.current.weather_icons}</p>
            <p><strong>wind:</strong>{`${climate.current.wind_speed} kph direction ${climate.current.wind_dir}`}</p>
        </div>
    )
}


export default Weather