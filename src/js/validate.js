export default class ValidNumber {
  constructor(cardNumber) {
    this.cardNumber = cardNumber;
  }

  isValid() {
    let sum = 0;
    const length = this.cardNumber.length;
    const parity = length % 2;

    for (let i = 0; i < length; i++) {
      let digit = parseInt(this.cardNumber[i], 10);
      if (isNaN(digit)) return false;
      if (i % 2 === parity) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    return sum % 10 === 0;
  }
}
