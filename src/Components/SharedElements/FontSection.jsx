import React, { useEffect, useState } from 'react'
import SectionTitle from './SectionTitle'

const FontSection = () => {
  // State to store font families, sizes, and weights
  const [fontFamilies, setFontFamilies] = useState([])
  const [fontSizes, setFontSizes] = useState([])
  const [fontWeights, setFontWeights] = useState([])

  // Function triggered when the button is clicked
  const handleClick = () => {
    // Step 1: Get the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0] // Get the current active tab

      // Step 2: Inject the getFonts function into the active tab
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTab.id }, // Specify the tab to run the script in
          function: getFonts // The function that will be injected into the tab
        },
        (results) => {
          // Check if results are valid and present
          if (results && results[0]) {
            const uniqueFonts = results[0].result.fonts // Extract fonts
            const sizes = results[0].result.sizes // Extract sizes
            const weights = results[0].result.weights // Extract weights

            // Step 3: Update the state with the collected font data
            setFontFamilies(
              uniqueFonts
                .filter((font) => !font.startsWith('system-ui')) // Exclude system-ui fonts
                .map((font) => {
                  const parts = font.split(',') // Split the font family string by commas
                  return parts[0].replace(/["']/g, '').trim() // Return the first part as the font name, remove quotes
                })
            )
            setFontSizes(sizes) // Update state with font sizes
            setFontWeights(weights) // Update state with font weights
          } else {
            console.error('No results found or script execution failed.')
          }
        }
      )
    })
  }

  // Function to be injected into the webpage to collect fonts, sizes, and weights
  function getFonts() {
    const fonts = new Set() // To store unique font families
    const sizes = new Set() // To store unique font sizes
    const weights = new Set() // To store unique font weights
    const elements = document.querySelectorAll('*') // Select all elements on the page

    // Loop through all elements and collect computed styles
    elements.forEach((el) => {
      const computedStyle = window.getComputedStyle(el) // Get the computed style of the element
      fonts.add(computedStyle.fontFamily) // Add the font family to the set
      sizes.add(computedStyle.fontSize) // Add the font size to the set
      weights.add(computedStyle.fontWeight) // Add the font weight to the set
    })

    // Return the fonts, sizes, and weights as arrays
    return {
      fonts: Array.from(fonts), // Convert the Set to an Array
      sizes: Array.from(sizes),
      weights: Array.from(weights)
    }
  }

  return (
    <div className='font-data'>
      <button onClick={() => handleClick()}>Click</button>{' '}
      {/* Button to trigger the handleClick function */}
      {/* Section for displaying font families */}
      <div className='font-family-data mb-4'>
        <SectionTitle title='Font Family' />
        <div className='font-sizes flex gap-2 flex-wrap mt-2'>
          {fontFamilies.map((font, idx) => (
            <p
              key={idx}
              className='single-font-name px-3 py-1 border rounded-full text-[14px]'>
              {font}
            </p>
          ))}
        </div>
      </div>
      {/* Section for displaying font sizes */}
      <div className='font-size-data mb-4'>
        <SectionTitle title='Font Sizes' />
        <div className='font-sizes flex gap-2 flex-wrap mt-3'>
          {fontSizes.map((size, idx) => (
            <p
              key={idx}
              className='font-size-block px-3 py-1 border rounded-full text-[14px]'>
              {size}
            </p>
          ))}
        </div>
      </div>
      {/* Section for displaying font weights */}
      <div className='font-weight-data'>
        <SectionTitle title='Font Weights' />
        <div className='font-weights flex gap-2 flex-wrap mt-3'>
          {fontWeights.map((weight, idx) => (
            <p
              key={idx}
              className='font-weight-block px-3 py-1 border rounded-full text-[14px]'>
              {weight}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FontSection
