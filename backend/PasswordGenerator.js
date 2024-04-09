

var generator = require('generate-password');

class PasswordGenerator {

  static generatePassword(
    length,
    includeLowercase = true,
    includeUppercase = true,
    includeNumbers = true,
    includeSymbols = true
  ) {

    if(!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      return "We no chociaż jedno zaznacz a nie...";
    }
    
    return generator.generate({
      length: length,
      lowercase: includeLowercase,
      uppercase: includeUppercase,
      numbers: includeNumbers,
      symbols: includeSymbols
    })
    
  }
}

module.exports = PasswordGenerator;