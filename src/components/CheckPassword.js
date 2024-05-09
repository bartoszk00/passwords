import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import App from '../App';
import axios from 'axios';
import mem from "../assets/mem.jpg";
import memDwa from "../assets/mem2.jpg";
import '../App.css';

function CheckPassword(setWhichSite) {
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
        const numberOfOccurrences = data.numberOfOccurrences;

        setPwned(numberOfOccurrences); 
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
          < br/> <br />
          {Pwned > 0 && (
              <div style={{ backgroundColor: '#8B0000', padding: '10px', color: 'white', borderRadius: '5px', marginBottom: '10px' }}>
                <h2>Zła wiadomość!</h2>
                To hasło pojawiło się wcześniej w wyniku naruszenia danych i nigdy nie powinno być używane. Jeśli kiedykolwiek wcześniej używałeś je gdziekolwiek, zmień je! <br/><br/>
                <img src={memDwa} alt="Obrazek" className='mem' style={{ width: '300px', height: '300px' }} />
              </div>
            )}
            {Pwned === 0 && (
              <div style={{ backgroundColor: 'green', padding: '10px', color: 'white', borderRadius: '5px', marginBottom: '10px' }}>
                <h2>Dobra wiadomość!</h2>
                To hasło nie zostało znalezione w żadnym z Pwned Passwords
                To niekoniecznie oznacza, że jest to dobre hasło, po prostu nie jest indeksowane na tej stronie.<br/><br/>
                <img src={mem} alt="Obrazek" className='mem' style={{ width: '300px', height: '300px' }} />
              </div>
            )}
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
