const { default: axios } = require("axios");
var sha1 = require('js-sha1');

class PasswordPwnedService {

    hashToSHA1(password) {
        const hash = sha1(password);
        let firstPartPasswordHash = hash.substring(0, 5);
        let secondPartPasswordHash = hash.substring(5).toUpperCase();
        return {
            firstPartHash: firstPartPasswordHash,
            secondPartHash: secondPartPasswordHash,
        };
    }

    async getPasswordPwnedData(firstPartPasswordHash) {
        return await axios.get(`https://api.pwnedpasswords.com/range/${firstPartPasswordHash}`)
            .then(response => {
                return response.data;
            })
    }

    async isPasswordPwned(password) {
        let passwordHashData = this.hashToSHA1(password);
        const passwordPwnedData = await this.getPasswordPwnedData(passwordHashData.firstPartHash);
        const splitedPasswordPwnedData = passwordPwnedData.split('\r\n');
        let numberOfOccurrences = 0;


        for (let i = 0; i < splitedPasswordPwnedData.length; i++) {
            if (splitedPasswordPwnedData[i].includes(passwordHashData.secondPartHash)) {
                numberOfOccurrences = splitedPasswordPwnedData[i].split(':')[1];
                break;
            }
        }
        return numberOfOccurrences;
    }
}

module.exports = PasswordPwnedService