const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const testHtml = fs.readFileSync(path.resolve(__dirname, 'test.html'), 'utf8');
const scriptsJs = fs.readFileSync(path.resolve(__dirname, 'scripts.js'), 'utf8');
const testJs = fs.readFileSync(path.resolve(__dirname, 'test.js'), 'utf8');

const dom = new JSDOM(testHtml, {
  runScripts: "dangerously",
  resources: "usable"
});

const window = dom.window;
const document = window.document;

// Mock the console to capture logs
let allTestsPassed = false;
window.console.log = (msg) => {
  console.log(`JSDOM LOG: ${msg}`);
  if (msg.includes('All tests passed!')) {
    allTestsPassed = true;
  }
};
window.console.error = (msg) => {
    console.error(`JSDOM ERROR: ${msg}`);
};


const scriptEl = document.createElement("script");
scriptEl.textContent = scriptsJs;
document.body.appendChild(scriptEl);

const testScriptEl = document.createElement("script");
testScriptEl.textContent = testJs;
document.body.appendChild(testScriptEl);


if (allTestsPassed) {
  console.log('Verification successful!');
  process.exit(0);
} else {
  console.error('Verification failed!');
  process.exit(1);
}
