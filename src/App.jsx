import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  
  const [temperature, setTemperature] = useState(true)
  const [centigrados, setCentigrados] = useState('')
  const [objClima, setObjClima] = useState({})
  const [cityName, setCityName] = useState('')

  useEffect(() => {

    function climate(position) {
      const crd = position.coords
       const lat = crd.latitude
       const lon = crd.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sp&appid=638130fa2c1dae6932baa7c5d7095ede`)
           .then(res => setObjClima(res.data))
           .catch(error => console.error(error))
        }
        navigator.geolocation.getCurrentPosition(climate)
    }, [])

    useEffect(() => {
      if (cityName) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=sp&appid=638130fa2c1dae6932baa7c5d7095ede`)
             .then(resp => setObjClima(resp.data))
             .catch(error => console.error(error))
      }
    },[cityName])
   console.log(objClima, 'brandoly')

  return (
    <div className='container'>
      <header className='header'>
        <h1>Weather app</h1>
        <div className='container--input'>
          <i className='bx bx-search-alt-2'></i>
          <input type="text"
          placeholder='busca tu ciudad aqui'
          onKeyUp={e => e.key === 'Enter'?setCityName(e.target.value):setCityName('')}/>
        </div>
      </header>
      
      <main className='main'>
        <div className='main--container'>
          <div className='container-png'>
            <span className='temperature'>{temperature? Math.floor(objClima.main?.temp) - 273:Math.floor((objClima.main?.temp - 273) *1.8 +32) }{temperature?'°C':' °F'}</span>
            <img className='img-clima2' src="../img/image-removebg-preview.png" alt="" />
            <img className='img-clima' src="../img/image-removebg-preview.png" alt="" />
          </div>
          <ul className='container--list'>
            <li className='list'>viento {objClima.wind?.speed} m/s</li>
            <li className='list'>humedad { objClima.main?.humidity }%</li>
            <li className='list'>presion { objClima.main?.sea_level } hPa</li>
          </ul>
          <div className='container--country'>
          <p>{objClima.sys?.country}</p>
          <p>{objClima.weather?.[0].description}</p>  
          </div>
        </div>
      </main>
      <div className='container--button'>
      <button className='button' 
      type='button'
      onClick={() => setTemperature(!temperature)}>{temperature?'Cambiar a F°':'cambiar a grados °C'}</button>
      </div>
    </div>
  )
}


export default App
