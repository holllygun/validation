export default class PaySystem {
  constructor(cardnumber) {
    this.cardnumber = cardnumber;
  }

  detectPaysystem() {
    const cardStr = this.cardnumber.toString();
    const cardLength = cardStr.length;
    const firstDigit = parseInt(cardStr[0], 10);
    const firstTwoDigit = parseInt(cardStr.slice(0, 2), 10);
    const firstThreeDigit = parseInt(cardStr.slice(0, 3), 10);
    const firstFourDigit = parseInt(cardStr.slice(0, 4), 10);
    const firstSixDigit = parseInt(cardStr.slice(0, 6), 10);

    if ((firstTwoDigit === 34 || firstTwoDigit === 37) && cardLength === 15)
      return "amex";
    else if (
      (([300, 301, 302, 303, 304, 305].includes(firstThreeDigit) ||
        firstTwoDigit === 36) &&
        cardLength === 14) ||
      (cardLength === 16 && firstTwoDigit === 54)
    )
      return "diners";
    else if (
      (643 < firstThreeDigit && firstThreeDigit < 650) ||
      (622125 < firstSixDigit && firstSixDigit < 622926) ||
      firstFourDigit === 6011 ||
      (firstTwoDigit === 65 && cardLength === 16)
    )
      return "discover";
    else if (
      3527 < firstFourDigit &&
      firstFourDigit < 3590 &&
      15 < cardLength &&
      cardLength < 20
    )
      return "jcb";
    else if (
      (50 < firstTwoDigit && firstTwoDigit < 56) ||
      (222099 < firstSixDigit && firstSixDigit < 272100 && cardLength === 16)
    )
      return "mastercard";
    else if (
      firstDigit === 4 &&
      (cardLength === 13 || cardLength === 16 || cardLength === 19)
    )
      return "visa";
    else if (
      2199 < firstFourDigit &&
      firstFourDigit < 2205 &&
      15 < cardLength &&
      cardLength < 20
    )
      return "mir";
    else return "Unknown";
  }
}
