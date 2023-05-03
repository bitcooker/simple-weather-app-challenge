import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

import { RiCloudWindyLine } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";

import { WeatherDataType } from "./types";

const countryLists = ["New York", "London", "Paris", "Tokyo"];

export const WeatherFetch: React.FC = () => {
  const [iconUrl, setIconUrl] = useState("");
  const [country, setCountry] = useState("New York");
  const [weatherdata, setWeatherData] = useState<WeatherDataType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeatherData("New York");
  }, []);

  const fetchWeatherData = (country?: string) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setIconUrl(
          `http://openweathermap.org/img/w/${data?.weather[0].icon}.png`
        );
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center gap-5 p-10 border rounded-lg shadow-lg card border-black/5 bg-slate-100">
      {( weatherdata && Object.keys(weatherdata).length && (
        <>
          <div className="flex items-center w-full gap-5">
            <div className="w-full rounded-lg shadow-lg">
              <select
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                value={country}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {countryLists?.map((item) => (
                  <option key={uuidv4()} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fetchWeatherData(country);
              }}
              className={clsx(
                { "bg-slate-200": loading },
                "w-[6rem] h-[2.5rem] flex items-center justify-center border border-slate-500 shadow-lg hover:text-black text-black font-semibold hover:shadow-2xl hover:bg-black/10 px-auto py-2 rounded-md active:border-2"
              )}
            >
              <span className={clsx({ hidden: loading })}>LOAD</span>
              <div className={clsx({ hidden: !loading })} role="status">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </button>
          </div>
          <div>
            <img
              data-tooltip-target="img-tooltip"
              className="w-[10rem]"
              src={iconUrl}
              alt={iconUrl}
            />
          </div>
          <h3 className="text-5xl font-bold">
            {weatherdata?.main.temp &&
              (weatherdata?.main.temp - 273).toFixed(2)}{" "}
            &#8451;
          </h3>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <RiCloudWindyLine size="2rem" />
              <p className="text-2xl text-slate-500">
                {weatherdata?.main.humidity} %
              </p>
            </div>
            <div className="flex items-center gap-2">
              <WiHumidity size={"2rem"} />
              <p className="text-2xl text-slate-500">
                {weatherdata?.wind.speed} m/s
              </p>
            </div>
          </div>
        </>
      )) || <h1 className="text-2xl text-center">There is no data</h1>}
    </div>
  );
};
