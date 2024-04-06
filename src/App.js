import { Container, Typography, TextField, Grid, Slider, Checkbox, Button } from '@mui/material';
import { useState } from 'react';
import redImage from './czerwony.gif';
import yellowImage from './zolty.gif';
import greenImage from './zielony.gif';
import "./App.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(50);
  const [image, setImage] = useState(greenImage);

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
      <header className={"App-header"} style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ flexGrow: 1, marginTop: '20px'}}>
          <Typography variant="h3">
            Generator przykładowych haseł
          </Typography>
          <Typography variant="subtitle1">
            Wygeneruj silne i bezpieczne hasło dla swojego konta
          </Typography>
        </div>
      </header>
      <Grid container alignItems="center" style={{ marginTop: '100px' }}>
        <Grid item xs={6}>
          <img src={image} alt="Obrazek" style={{ width: '400px', height: '400px' }} />
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField 
                label="" 
                variant="outlined" 
                style={{ width: '100%' }}
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
                style={{ width: '100%' }}
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
