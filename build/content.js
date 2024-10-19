// content.js
const fonts = new Set()
const sizes = new Set()

document.querySelectorAll('*').forEach((element) => {
  const computedStyle = window.getComputedStyle(element)
  const fontFamily = computedStyle.fontFamily
  const fontSize = computedStyle.fontSize

  if (fontFamily) {
    fonts.add(fontFamily)
  }
  if (fontSize) {
    sizes.add(fontSize)
  }
})

// Send the collected font data back to the background script
chrome.runtime.sendMessage({
  fonts: Array.from(fonts),
  sizes: Array.from(sizes)
})
