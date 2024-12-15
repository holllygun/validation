import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(90000);
describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  test("delete stroke", async () => {
    await page.goto(baseUrl);
    const form = await page.waitForSelector(".form");

    const input = await form.$(".card_number");
    const submit = await form.$(".submit");

    await input.type("5555555555554444");
    await submit.click();
    await page.waitForSelector(".mastercard.stroke");
    await input.type("525");

    const classToCheck = ".stroke";
    const element = await page.$(classToCheck);
    expect(element).toBeNull();
  });

  test("enter card number alert", async () => {
    await page.goto(baseUrl);
    let alertMessage = null;

    page.once("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    const btn = await page.waitForSelector(".submit");
    const form = await page.waitForSelector(".form");
    const input = await form.$(".card_number");
    await input.type("88");
    await btn.click();
    expect(alertMessage).toBe("Invalid card number");
  });

  test("enter empty field alert", async () => {
    await page.goto(baseUrl);
    let alertMessage = null;

    page.once("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    const btn = await page.waitForSelector(".submit");
    await btn.click();

    expect(alertMessage).toBe("Please enter a card number");
  });

  test("detect mastercard paysystem", async () => {
    await page.goto(baseUrl);
    const form = await page.waitForSelector(".form");

    const input = await form.$(".card_number");
    const submit = await form.$(".submit");

    await input.type("5555555555554444");
    await submit.click();
    await page.waitForSelector(".mastercard.stroke");
  });

  test("detect amex paysystem", async () => {
    await page.goto(baseUrl);
    const form = await page.waitForSelector(".form");

    const input = await form.$(".card_number");
    const submit = await form.$(".submit");

    await input.type("349963188953201   ");
    await submit.click();
    await page.waitForSelector(".amex.stroke");
  });

  test("detect diners paysystem", async () => {
    await page.goto(baseUrl);
    const form = await page.waitForSelector(".form");

    const input = await form.$(".card_number");
    const submit = await form.$(".submit");

    await input.type("   36858799046833");
    await submit.click();
    await page.waitForSelector(".diners.stroke");
  });

  test("detect discover paysystem", async () => {
    await page.goto(baseUrl);
    const form = await page.waitForSelector(".form");

    const input = await form.$(".card_number");
    const submit = await form.$(".submit");

    await input.type("6011417102528064");
    await submit.click();
    await page.waitForSelector(".discover.stroke");
  });

  test("detect visa paysystem", async () => {
    await page.goto(baseUrl);
    const form = await page.waitForSelector(".form");

    const input = await form.$(".card_number");
    const submit = await form.$(".submit");

    await input.type("4532819233383241");
    await submit.click();
    await page.waitForSelector(".visa.stroke");
  });

  test("detect jcb paysystem", async () => {
    await page.goto(baseUrl);
    const form = await page.waitForSelector(".form");

    const input = await form.$(".card_number");
    const submit = await form.$(".submit");

    await input.type("3529561286388605");
    await submit.click();
    await page.waitForSelector(".jcb.stroke");
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    } else {
      console.error("browser was not initialized");
    }
    server.kill();
  });
});
