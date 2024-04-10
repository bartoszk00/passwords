const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

const PasswordGenerator = require("./PasswordGenerator");
const PasswordDictionaryFetcher = require('./PasswordDictionaryFetcher');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

//db connection

PasswordDictionaryFetcher.fetchRandomPasswordDictionaryElement().catch(console.dir);

//endpoints
app.post('/generatePassword', (req, res) => {
  const length = parseInt(req.body.length);
  const includeLowercase = req.body.includeLowercase;
  const includeUppercase = req.body.includeUppercase;
  const includeNumbers = req.body.includeNumbers;
  const includeSymbols = req.body.includeSymbols;

  const generatedPassword = PasswordGenerator.generatePassword(
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  const responseData = {
    password: generatedPassword,
  }

  res.send(JSON.stringify(responseData));

});



// Nasłuchuj na określonym porcie
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});