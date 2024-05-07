

class PasswordDictionaryFetcher {
  static async fetchRandomPasswordDictionaryElement(client) {
    try {
      const database = client.db('passwords');
      const collection = database.collection('passwords-dictionary');
      const passwordsDictionary = await collection.find().toArray();

      if (passwordsDictionary.length === 0) {
        return "";
      }

      const randomIndex = Math.floor(Math.random() * passwordsDictionary.length);
      const randomPasswordDictionaryElement = passwordsDictionary[randomIndex].password;
      return randomPasswordDictionaryElement;

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PasswordDictionaryFetcher;