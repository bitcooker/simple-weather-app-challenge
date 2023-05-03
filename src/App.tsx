import React from "react";
import "./App.css";
import { WeatherFetch } from "./weatherFetch";

function App() {
  return (
    <div className="max-w-2xl mx-auto my-10 App">
      <WeatherFetch />
    </div>
  );
}

export default App;
