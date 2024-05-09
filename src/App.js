import React, { useEffect, useState } from 'react';
import "./App.css";
import CheckPassword from './components/CheckPassword';
import GeneratePassword from './components/GeneratePassword';

function App() {
  const [whichSite, setWhichSite] = useState(0);
  
  return (
    whichSite === 0 ? (
      <GeneratePassword setWhichSite={setWhichSite}/>
    ) : (
      <CheckPassword setWhichSite={setWhichSite}/>
    )
  );
}  

export default App;
