import { Container, Typography, TextField, Grid, Slider, Checkbox, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import redImage from "./assets/czerwony.gif";
import yellowImage from './assets/zolty.gif';
import greenImage from './assets/zielony.gif';
import "./App.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(25);
  const [image, setImage] = useState(greenImage);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchPassword(passwordLength, false, true, false);
  }, [passwordLength]);

  const fetchPassword = async (length, includeUppercase, includeNumbers, includeSymbols) => {
    fetch("http://localhost:3001/generatePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        length: "20",
        includeUppercase: false,
        includeNumbers: true,
        includeSymbols: false
      }),
    }).then((response) => {
      response.json().then((data) => {
        setPassword(data.password);
      }).catch((error) => {
        console.log(error);
      });
    })
  }


  const handleSliderChange = (event, newValue) => {
    setPasswordLength(newValue);

    if (newValue < 10) {
      setImage(redImage);
    } else if (newValue >= 10 && newValue < 30) {
      setImage(yellowImage);
    } else {
      setImage(greenImage);
    }
  };

  return (
    <Container>
      <header className={"App-header"} >
        <div className='App-div'>
          <Typography variant="h3">
            Generator przykładowych haseł
          </Typography>
          <Typography variant="subtitle1">
            Wygeneruj silne i bezpieczne hasło dla swojego konta
          </Typography>
        </div>
      </header>
      <Grid container alignItems="center" className='App-grid1'>
        <Grid item xs={6}>
          <img src={image} alt="Obrazek" className='App-image' />
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label=""
                variant="outlined"
                className='App-textField'
                value={password}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">Długość hasła: {passwordLength}</Typography>
              <Slider
                defaultValue={50}
                value={passwordLength}
                onChange={handleSliderChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={50}
                className='App-slider'
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">Wybór znaków:</Typography>
              <Checkbox defaultChecked /> abc
              <Checkbox defaultChecked /> ABC
              <Checkbox defaultChecked /> 123
              <Checkbox defaultChecked /> !@#
            </Grid>
            <Grid item>
              <Button variant="contained">Odśwież</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
