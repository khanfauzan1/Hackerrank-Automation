const puppeteer = require("puppeteer");

const codeObj = require('./code');

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "fosab59581@ddwfzp.com";
const password = "Cool@123";

let browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});

let page;

browserOpen
  .then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
  })
  .then(function () {
    let emailEntered = page.type(
      "input[placeholder='Your username or email']",
      email,
      { delay: 50 }
    );
    return emailEntered;
  })
  .then(function () {
    let passwordEntered = page.type(
      "input[placeholder='Your password']",
      password,
      { delay: 50 }
    );
    return passwordEntered;
  })
  .then(function () {
    let loginButtonClicked = page.click(
      'button[type="button"][class*="c-cUYkx"][class*="variant-primary"]',
      { delay: 50 }
    );
    return loginButtonClicked;
  })
  .then(function () {
    let clickOnAlogPromise = waitAndClick(
      '.topic-card a[data-attr1="algorithms"]',
      page
    );
    return clickOnAlogPromise;
  })
  .then(function () {
    let goToWarmUp = waitAndClick('input[value="warmup"]', page);
    return goToWarmUp;
  })
  .then(function () {
    let waitFor3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
    return waitFor3Sec;
  })
  .then(function () {
    let allChallengesPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 50 }
    );
    return allChallengesPromise;
  })
  .then(function (questionsArr) {
    console.log("no of questions", questionsArr.length);
    let questionWillBeSolved = questionSolver(page, questionsArr[0],codeObj.answers[0] );
    return questionWillBeSolved;
  });

// wait for next page to load then seclet the elements as per need
function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cPage.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let clickModal = cPage.click(selector);
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let questionWillBeClicked = question.click();
    questionWillBeClicked
      .then(function () {
        let EditorInFocusPromise = waitAndClick(
          ".monaco-editor.no-user-select.showUnused.showDeprecated.vs",
          page
        );
        return EditorInFocusPromise;
      })
      .then(function () {
        return waitAndClick("input.checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector(".input.text-area", page);
      })
      .then(function () {
        return page.type(".input.text-area", answer, { delay: 10 });
      })
      .then(function () {
        let ctrlIsPressed = page.keyboard.down("Control");
        return ctrlIsPressed;
      })
      .then(function () {
        let AisPressed = page.keyboard.press("A", { delay: 100 });
        return AisPressed;
      })
      .then(function () {
        let XisPressed = page.keyboard.press("X", { delay: 100 });
        return XisPressed;
      })
      .then(function () {
        let CtrlIsUnPressed = page.keyboard.up("Control");
        return CtrlIsUnPressed;
      })
      .then(function () {
        let mainEditorInFocus = waitAndClick(
          ".monaco-editor.no-user-select.showUnused.showDeprecated.vs",
          page
        );
        return mainEditorInFocus;
      })
      .then(function () {
        let ctrlIsPressed = page.keyboard.down("Control");
        return ctrlIsPressed;
      })
      .then(function () {
        let AisPressed = page.keyboard.press("A", { delay: 100 });
        return AisPressed;
      })
      .then(function () {
        let VisPressed = page.keyboard.press("V", { delay: 100 });
        return VisPressed;
      })
      .then(function () {
        let CtrlIsUnPressed = page.keyboard.up("Control");
        return CtrlIsUnPressed;
      })
      .then(function () {
        return page.click(
          ".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled",
          { delay: 50 }
        );
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      })
  })
}


