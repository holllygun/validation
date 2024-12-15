import ValidNumber from "./validate";
import PaySystem from "./pay_system";

export default class DomActions {
  constructor() {
    this.init();
  }

  init() {
    const type = document.querySelector(".card_number");
    type.addEventListener("keydown", () => {
      const stroke = document.querySelector(".stroke");
      if (stroke) {
        stroke.classList.remove("stroke");
      }
    });

    const btn = document.querySelector("button");
    btn.addEventListener("click", () => {
      const inputField = document.querySelector(".card_number");
      const cardNumber = inputField.value.trim();
      if (cardNumber) {
        this.handleCardNumber(cardNumber);
      } else {
        alert("Please enter a card number");
      }
      inputField.value = "";
    });
  }

  handleCardNumber(cardNumber) {
    const validNumber = new ValidNumber(cardNumber);
    if (validNumber.isValid()) {
      const paySystem = new PaySystem(cardNumber);
      const currentSystem = paySystem.detectPaysystem();
      console.log(currentSystem);
      const stroke = document.querySelector(`.${currentSystem}`);
      stroke.classList.add("stroke");
    } else {
      alert("Invalid card number");
    }
  }
}
