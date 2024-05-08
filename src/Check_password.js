import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import App from './App';
import axios from 'axios';

function CheckPassword() {
  const [site, setSite] = useState(1);
  const [Pwned, setPwned] = useState(0);
  const [password, setPassword] = useState('');

  const handleCheckPasswordUsage = () => {
    setSite(0);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckPwned = async () => {
    try {
      const response = await axios.get('http://localhost:3001/check-pwned?password=' + password);
      if (response.data) {
        const data = response.data;
        const numberOfOccurrences = parseInt(data.match(/\d+/)[0]); // Wyodrębnienie liczby z odpowiedzi
        setPwned(numberOfOccurrences); // Ustawienie tylko liczby wystąpień pownowania
      } else {
        console.error('Odpowiedź z serwera jest pusta.');
      }
    } catch (error) {
      console.error('Błąd podczas sprawdzania hasła:', error);
    }
  };
  
  
  return (
    <>
      {site === 1 ? (
        <div>
          <center><h1>Pwned hasła</h1>
          <p>Pwned Passwords to setki milionów rzeczywistych haseł, które wcześniej ujawniły się w naruszeniach danych. Ta ekspozycja sprawia, że nie nadają się do ciągłego użytkowania, ponieważ są narażone na znacznie większe ryzyko wykorzystania ich do przejęcia innych kont.</p>
          <TextField
            label=""
            variant="outlined"
            className='App-textField'
            sx={{ width: '500px' }}
            onChange={handlePasswordChange}
            value={password}
          />
          <Button
              variant="contained"
              sx={{ ml: 1, height: '55px' }}
              onClick={handleCheckPwned}
            >
              Pwned?
              
          </Button><br /> <br />
          Twoje hasło zostało uzyte {Pwned} razy!
          <br /><br />
            <Button
              onClick={handleCheckPasswordUsage}
              variant="contained"
              sx={{ ml: 1 }}
            >
              Powrót do generatora
            </Button>
          </center>
        </div>
      ) : (
        <App />
      )}
    </>
  );
}

export default CheckPassword;
