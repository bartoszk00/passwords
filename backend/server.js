const dotenv = require('dotenv').config();
const express = require('express');
const { MongoClient } = require("mongodb");
const cors = require('cors');
const bodyParser = require('body-parser');
const PasswordGenerator = require("./PasswordGenerator");
const PasswordDictionaryFetcher = require('./PasswordDictionaryFetcher');
const PasswordPwnedService = require('./PasswordPwnedService');
const app = express();
const PORT = process.env.PORT || 3002;


const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@passwordscluster.k0wzssr.mongodb.net/?retryWrites=true&w=majority&appName=PasswordsCluster`;

const client = new MongoClient(uri);

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

const getPasswordDirectory = async (client) => {
  return await PasswordDictionaryFetcher.fetchRandomPasswordDictionaryElement(client);
}

//endpoints
app.post('/generatePassword', async (req, res) => {
  const length = parseInt(req.body.length);
  const includeLowercase = req.body.includeLowercase;
  const includeUppercase = req.body.includeUppercase;
  const includeNumbers = req.body.includeNumbers;
  const includeSymbols = req.body.includeSymbols;
  const includeDictionaries = req.body.includeDictionaries;

  const responseData = {
    password: "",
  }

  const generatedPassword = PasswordGenerator.generatePassword(
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  if (includeDictionaries) {
    let passwordDirectory = await getPasswordDirectory(client);
    responseData.password = PasswordGenerator.addDictionaryValueToPassword(generatedPassword, passwordDirectory);
  } else {
    responseData.password = generatedPassword
  }

  res.send(JSON.stringify(responseData));

});

app.get('/check-pwned', async (req, res) => {
    const passwordPwnedService = new PasswordPwnedService();
    
    const numberOfOccurrences = await passwordPwnedService.isPasswordPwned(req.body.password);

    res.send(JSON.stringify("occurrences: " + numberOfOccurrences));
})


// Nasłuchuj na określonym porcie
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});