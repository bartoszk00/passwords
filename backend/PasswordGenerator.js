

var generator = require('generate-password');

class PasswordGenerator {

  static generatePassword(
    length,
    includeUppercase = true,
    includeNumbers = true,
    includeSymbols = true
  ) {

    return generator.generate({
      length: length,
      uppercase: includeUppercase,
      numbers: includeNumbers,
      symbols: includeSymbols
    })
    
  }
}

module.exports = PasswordGenerator;