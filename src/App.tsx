import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { WeatherFetch } from "./weatherFetch";

function App() {
  return (
    <div className="App max-w-2xl mx-auto my-10">
      <WeatherFetch />
    </div>
  );
}

export default App;
