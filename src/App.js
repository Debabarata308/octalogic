import React from 'react'
import Contact from './components/Contact'
import Wheels from './components/Wheels'
import Vehicle from './components/Vehicle'
import Model from './components/Model'
import { Routes,Route } from 'react-router-dom'
import "./App.css"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Contact />} />
        <Route path="/wheel" element={<Wheels />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/model" element={<Model />} />
      </Routes>
    </div>
  );
}

export default App