import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { SwitchControl } from "./components/SwitchControl";

function App() {
  return (
    <div className="App">
        <SwitchControl thingId="esp8266" />
    </div>
  );
}

export default App;
