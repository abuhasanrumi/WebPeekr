// background.js
let fontData = {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.getFonts) {
    sendResponse(fontData) // Respond with the stored font data
  }
})
