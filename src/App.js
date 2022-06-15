import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './scss/main.scss'; 

export default function App() {

  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location === false) {
    return (
      <Fragment>
        <h2>Você precisa habilitar a localização no browser</h2>
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        <h2>Carregando o clima...</h2>
      </Fragment>
    )
  } else {
    let img = weather['weather'][0]['icon']
    let vento = weather['wind']['speed'] * 3.6
    return (

      <main>
        <h1>Tempo agora em {weather['name']}, {weather['sys']['country']}</h1>
        <section>
          <h2>{weather['weather'][0]['description']}</h2>
          <div id='info'>
            <div id='clima'>
              <p id='temp'>{weather['main']['temp'].toFixed(1)}°</p>
              <img src={'http://openweathermap.org/img/wn/'+img.slice(0, -1)+'d@2x.png'} alt="tempo" />
            </div>
            <ul id='info-g'>
                 <li>
                  <span>Sensação térmica</span>
                  <span>{weather['main']['feels_like']}°</span>
                 </li>
                 <li id='vento'>
                  <span>Umidade</span>
                  <span>{weather['main']['humidity']}%</span>
                 </li>
                 <li>
                  <span>Vento</span>
                  <span>{vento.toFixed(2)}km/h</span>
                 </li>
            </ul>
            <ul id='info-g600w'>
                 <li>
                  <span>Sensação térmica: </span>
                  <span>{weather['main']['feels_like']}°</span>
                 </li>
                 <li id='vento'>
                  <span>Umidade: </span>
                  <span>{weather['main']['humidity']}%</span>
                 </li>
                 <li>
                  <span>Vento: </span>
                  <span>{vento.toFixed(2)}km/h</span>
                 </li>
            </ul>
          </div>
        </section>
      </main>
    );
  }
}
