import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import mem from "../assets/mem.jpg";
import memDwa from "../assets/mem2.jpg";
import '../App.css';

function CheckPassword({ setWhichSite }) {
  const [isLeaked, setIsLeaked] = useState(null); // Zmiana na null
  const [password, setPassword] = useState('');
  const [numberOfOccurrences, setNumberOfOccurrences] = useState('');

  const handleCheckPasswordUsage = () => {
    setWhichSite(0);
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
        setNumberOfOccurrences(numberOfOccurrences);
        setIsLeaked(numberOfOccurrences > 0);
      } else {
        console.error('Odpowiedź z serwera jest pusta.');
      }
    } catch (error) {
      console.error('Błąd podczas sprawdzania hasła:', error);
    }
  };

  //TODO: zmien na z z kropką u góry
  return (
    <div style={{ padding: '0 20px' }}>
      <center>
        <h1>Sprawdź, czy twoje hasło nie wyciekło!</h1>
        <p>Wpisz hasło i sprawdź, czy nie zostało ono już ujawnione.</p>
        <p> Aplikacja współpracuje z ciągle aktualizowaną bazą zawierającą setki milionów haseł, ktore zostaly ujawnione w rónego rodzaju naruszeniach danych. Ta ekspozycja sprawia, że nie nadają się do ciągłego użytkowania, ponieważ są narażone na znacznie większe ryzyko wykorzystania ich do przejęcia innych kont.
        </p>
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
          Sprawdź
        </Button>
        <br /><br />
        {isLeaked !== null && ( // Sprawdzenie czy isLeaked nie jest null
          <>
            Twoje hasło zostało użyte {numberOfOccurrences} razy!
            <br /><br />
            {isLeaked === true && (
              <div style={{ backgroundColor: '#8B0000', padding: '10px', color: 'white', borderRadius: '5px', marginBottom: '10px' }}>
                <h2>Zła wiadomość!</h2>
                To hasło pojawiło się wcześniej w wyniku naruszenia danych i nigdy nie powinno być używane. Jeśli kiedykolwiek wcześniej używałeś je gdziekolwiek, zmień je! <br /><br />
                <img src={memDwa} alt="Obrazek" className='mem' style={{ width: '300px', height: '300px' }} />
              </div>
            )}
            {isLeaked === false && (
              <div style={{ backgroundColor: 'green', padding: '10px', color: 'white', borderRadius: '5px', marginBottom: '10px' }}>
                <h2>Dobra wiadomość!</h2>
                To hasło nie zostało znalezione w żadnym z Pwned Passwords. To niekoniecznie oznacza, że jest to dobre hasło, po prostu nie jest indeksowane na tej stronie.<br /><br />
                <img src={mem} alt="Obrazek" className='mem' style={{ width: '300px', height: '300px' }} />
              </div>
            )}
          </>
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
  );
}

export default CheckPassword;
