const express = require('express');
const cors = require('cors');
const { MongoClient } = require ("mongodb");
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

const PasswordGenerator = require("./PasswordGenerator");
const uri = "mongodb+srv://mongopasswords:8SOpI4mJmAs8aWwy@passwordscluster.k0wzssr.mongodb.net/?retryWrites=true&w=majority&appName=PasswordsCluster";

const client = new MongoClient(uri);

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

//db connection

async function run() {
  try {
    const database = client.db('passwords');
    const movies = database.collection('passwords-dictionary');
    const passwords = await movies.find().toArray();

    if(passwords.length === 0) {
      return "";
    }
    
    const randomIndex = Math.floor(Math.random() * passwords.length);
    const randomPassword = passwords[randomIndex].password;
    console.log(randomPassword);
    return randomPassword;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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