import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Grid, Slider, Checkbox, Button, Snackbar, Alert } from '@mui/material';
import PasswordStrengthBar from 'react-password-strength-bar';
import redImage from "./assets/czerwony.gif";
import yellowImage from './assets/zolty.gif';
import greenImage from './assets/zielony.gif';
import "./App.css";
import CheckPassword from './Check_password';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [passwordLength, setPasswordLength] = useState(25);
  const [image, setImage] = useState(greenImage);
  const [password, setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeDictionaries, setIncludeDictionaries] = useState(true);
  const [site, setSite] = useState(0);

  useEffect(() => {
    fetchPassword(
      passwordLength,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols,
      includeDictionaries
    );
  }, [passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols, includeDictionaries]);

  useEffect(() => {
    handleImageChange();

  }, [passwordScore]);

  const handleImageChange = () => {
    switch (passwordScore) {
      case 0:
      case 1:
      case 2:
        setImage(redImage);
        break;
      case 3:
        setImage(yellowImage);
        break;
      case 4:
        setImage(greenImage);
        break;
      default:
        setImage(redImage);
    }
  }

  const fetchPassword = async (
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    includeDictionaries
  ) => {
    fetch("http://localhost:3001/generate-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        length: length,
        includeLowercase: includeLowercase,
        includeUppercase: includeUppercase,
        includeNumbers: includeNumbers,
        includeSymbols: includeSymbols,
        includeDictionaries: includeDictionaries
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
  };

  const handleOpenSnackbarClose = () => {
    setIsCopied(false);
  }

  const handlePasswordScoreChange = (score, feedback) => {
    setPasswordScore(score);
  }

  const handleCheckPasswordUsage = () => {
    setSite(1);
  }

  return (
    <Container>
      {site === 0 ? (
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
      ) : (
        <CheckPassword />
      )}
      {site === 0 && (
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
                <PasswordStrengthBar
                  scoreWords={['Słabe', 'Słabe', "Średnie", "Dobre", "Silne"]}
                  minLength={8}
                  shortScoreWord="Zbyt krótkie"
                  password={password}
                  onChangeScore={handlePasswordScoreChange}
                />
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  Długość hasła: {passwordLength}
                  {includeDictionaries ? ` + ${password.length - passwordLength} = ${password.length}` : ""}
                </Typography>
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
                <Checkbox
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                /> abc
                <Checkbox
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                /> ABC
                <Checkbox
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                /> 123
                <Checkbox
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                /> !@#
                <Checkbox
                  checked={includeDictionaries}
                  onChange={() => setIncludeDictionaries(!includeDictionaries)}
                /> Słownik
              </Grid>
              <Grid item>
                <Button
                  onClick={() => fetchPassword(
                    passwordLength,
                    includeLowercase,
                    includeUppercase,
                    includeNumbers,
                    includeSymbols,
                    includeDictionaries
                  )}
                  variant="contained"
                >
                  Odśwież
                </Button>
                <CopyToClipboard text={password}>
                  <Button
                    onClick={() => setIsCopied(true)}
                    variant="contained" sx={{ ml: 1 }}
                  >
                    Kopiuj
                  </Button>
                </CopyToClipboard>
                <Button
                  onClick={handleCheckPasswordUsage}
                  variant="contained" sx={{ ml: 1 }}
                >
                  Sprawdź pwned hasła
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isCopied}
        autoHideDuration={1500}
        onClose={handleOpenSnackbarClose}
      >
        <Alert
          variant='filled'
          onClose={handleOpenSnackbarClose}
          severity="success"
        >
          Skopiowano do schowka.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
