const currentYear = new Date().getFullYear().toString();

console.log("Running tests...");

const yearEl = document.getElementById("year");
const yearPrivacyEl = document.getElementById("year-privacy");
const yearTermsEl = document.getElementById("year-terms");

let allTestsPassed = true;

if (yearEl.textContent !== currentYear) {
    console.error("Test Failed: #year should have the correct year.");
    allTestsPassed = false;
}

if (yearPrivacyEl.textContent !== currentYear) {
    console.error("Test Failed: #year-privacy should have the correct year.");
    allTestsPassed = false;
}

if (yearTermsEl.textContent !== currentYear) {
    console.error("Test Failed: #year-terms should have the correct year.");
    allTestsPassed = false;
}

if (allTestsPassed) {
    console.log("All tests passed!");
} else {
    console.error("Some tests failed.");
}
