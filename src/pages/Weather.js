import { useParams } from "react-router-dom";
import "../styles/Weather.css";
import "../styles/weather-icons.min.css";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../constants/apikey";

export default function Weather() {
  const [weatherData, setWeatherData] = useState({
    timezone: 0,
    dt: 0,
    temperature: 0.0,
    description: "",
    iconId: "",
    sunrise: 0,
    sunset: 0,
  });
  const [clock, setClock] = useState(new Date());

  const { city } = useParams();

  useEffect(() => {
    const getWeather = () => {
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: city,
            units: "metric",
            appid: API_KEY,
          },
        })
        .then((response) => {
          const data = response.data;
          setWeatherData({
            timezone: data.timezone,
            dt: data.dt,
            temperature: data.main.temp,
            description: data.weather[0].description,
            iconId: `wi wi-owm-${data.weather[0].id}`,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
          });
        });
    };

    getWeather();
    const timerID = setInterval(() => tick(), 60000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    const getTime = () => {
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;
      const utc = localTime + localOffset;
      const cityTime = utc + 1000 * weatherData.timezone;
      const nd = new Date(cityTime);
      setClock(nd);
    };

    getTime();
  }, [weatherData]);

  const tick = () => {
    setClock((prev) => {
      const cl = new Date(prev);
      cl.setMinutes(cl.getMinutes() + 1);
      return new Date(cl);
    });
  };

  return (
    <div>
      <Link to={"/"}>
        <MdArrowBackIos className="backBtn" size={30} />
      </Link>
      <div className="content">
        <div className="clock">
          <span>{clock.toLocaleTimeString("en-GB").split(":")[0]}</span>
          <span>{clock.toLocaleTimeString("en-GB").split(":")[1]}</span>
        </div>
        <div className="city">{city}</div>
        <div className="weather_info">
          <i className={weatherData.iconId} />
          <span className="description">{weatherData.description}</span>
          <div className="details">
            <div>
              <i className="wi wi-thermometer w-icon" />
              <i className="wi wi-sunrise w-icon" />
              <i className="wi wi-sunset w-icon" />
            </div>
            <div>
              <span>{`${weatherData.temperature} °C`}</span>
              <span>
                {new Date(
                  new Date().getTimezoneOffset() * 60000 +
                    weatherData.sunrise * 1000 +
                    weatherData.timezone * 1000
                ).toLocaleTimeString("it")}
              </span>
              <span>
                {new Date(
                  new Date().getTimezoneOffset() * 60000 +
                    weatherData.sunset * 1000 +
                    weatherData.timezone * 1000
                ).toLocaleTimeString("it")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
