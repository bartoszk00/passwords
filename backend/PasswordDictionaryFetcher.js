const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://mongopasswords:8SOpI4mJmAs8aWwy@passwordscluster.k0wzssr.mongodb.net/?retryWrites=true&w=majority&appName=PasswordsCluster";

const client = new MongoClient(uri);
class PasswordDictionaryFetcher {
  static async fetchRandomPasswordDictionaryElement() {
    try {
      const database = client.db('passwords');
      const collection = database.collection('passwords-dictionary');
      const passwordsDictionary = await collection.find().toArray();

      if (passwordsDictionary.length === 0) {
        return "";
      }

      const randomIndex = Math.floor(Math.random() * passwordsDictionary.length);
      const randomPasswordDictionaryElement = passwordsDictionary[randomIndex].password;
      console.log(randomPasswordDictionaryElement);
      return randomPasswordDictionaryElement;

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
}

module.exports = PasswordDictionaryFetcher;