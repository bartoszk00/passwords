import React, { useState } from 'react';
import { Button } from '@mui/material';
import App from './App';

function CheckPassword() {
  const [site, setSite] = useState(1);

  const handleCheckPasswordUsage = () => {
    setSite(0);
  };

  return (
    <>
      {site === 1 ? (
        <div>
          <center><h1>Sprawdź ile razy hasło było używane</h1>
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
