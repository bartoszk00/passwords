const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

const PasswordGenerator = require("./PasswordGenerator");

app.use(bodyParser.json());

//endpoints
app.post('/generatePassword', (req, res) => {
  const length = parseInt(req.body.length);
  const includeUppercase = req.body.includeUppercase;
  const includeNumbers = req.body.includeNumbers;
  const includeSymbols = req.body.includeSymbols;

  const generatedPassword = PasswordGenerator.generatePassword(
    length,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  res.send(generatedPassword);

});



// Nasłuchuj na określonym porcie
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});