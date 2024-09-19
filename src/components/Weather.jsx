import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog, WiStrongWind, WiThermometer, WiHumidity } from 'react-icons/wi';
import { FaClock } from 'react-icons/fa';

function Weather() {
    const [city, changeCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        changeCity(e.target.value);
    };

    const handleSearch = async () => {
        if (!city.trim()) {
            setError("Please enter a city name");
            setWeatherData(null);
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3272f12fced377bbefac5bb14f5e1cde`);
            changeCity("")
            setWeatherData(response.data);
        } catch (err) {
            setError("City not found. Please try again.");
            changeCity("")
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (weather) => {
        switch (weather.toLowerCase()) {
            case "clear":
                return <WiDaySunny className="text-yellow-400 text-6xl" />;
            case "clouds":
                return <WiCloud className="text-gray-400 text-6xl" />;
            case "rain":
                return <WiRain className="text-blue-400 text-6xl" />;
            case "snow":
                return <WiSnow className="text-blue-200 text-6xl" />;
            case "thunderstorm":
                return <WiThunderstorm className="text-purple-500 text-6xl" />;
            case "fog":
            case "mist":
                return <WiFog className="text-gray-300 text-6xl" />;
            default:
                return <WiStrongWind className="text-gray-500 text-6xl" />;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      };

    return (
        <div className="flex h-screen w-full justify-center items-center bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] p-6">
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 sm:p-10">
                <h1 className="text-center text-2xl sm:text-3xl font-bold text-white mb-6">Weather App</h1>
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <input
                        className="w-full sm:w-2/3 bg-gray-200 rounded-lg p-3 text-base sm:text-lg outline-none focus:ring-2 focus:ring-teal-400 font-poppins"
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center mt-6">
                        <svg
                            className="animate-spin h-8 w-8 text-teal-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 mt-6">{error}</div>
                ) : (
                    weatherData && (
                        <div className="mt-6 text-white">
                            <div className="text-center mb-4">
                                <h2 className="text-xl sm:text-2xl font-bold font-poppins">{weatherData.name}</h2>
                                <p className="text-md sm:text-lg font-poppins">{weatherData.weather[0].description}</p>
                                <div className="flex justify-center items-center mt-4">
                                    {getWeatherIcon(weatherData.weather[0].main)}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-lg font-poppins">
                                <div className="flex items-center">
                                    <WiThermometer className="text-3xl sm:text-4xl mr-2 text-teal-300" />
                                    <span className="font-bold">Temp: </span>
                                    {Math.round(weatherData.main.temp - 273.15)}°C
                                </div>
                                <div className="flex items-center">
                                    <WiHumidity className="text-3xl sm:text-4xl mr-2 text-teal-300" />
                                    <span className="font-bold">Humidity: </span>
                                    {weatherData.main.humidity}%
                                </div>
                                <div className="flex items-center">
                                    <WiStrongWind className="text-3xl sm:text-4xl mr-2 text-teal-300" />
                                    <span className="font-bold">Wind: </span>
                                    {weatherData.wind.speed} m/s
                                </div>
                                <div className="flex items-center">
                                    <FaClock className="text-3xl sm:text-4xl mr-2 text-teal-300" />
                                    <span className="font-bold">Time Zone: </span>
                                    GMT {weatherData.timezone / 3600 >= 0 ? '+' : '-'}
                                    {Math.abs(weatherData.timezone / 3600)}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Weather;
