import React, { useEffect, useState } from 'react'
import TabSection from './Components/TabSection'
import Header from './Components/Header'
import Footer from './Components/Footer'
import MetaDetails from './Components/SharedElements/MetaDetails'
import { MdManageSearch } from 'react-icons/md'
import WelcomeSection from './Components/SharedElements/WelcomeSection'

function App() {
  const [clicked, setClicked] = useState(false)

  // State to store font families, sizes, and weights in a single object
  const [fontDetails, setFontDetails] = useState({
    families: ['Times new roman', 'Poppins'],
    sizes: [],
    weights: []
  })

  // Function triggered when the button is clicked
  const handleClick = () => {
    setClicked(true)
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
            const { fonts, sizes, weights } = results[0].result // Destructure fonts, sizes, weights

            // Step 3: Update the state with the collected font data
            setFontDetails({
              families: fonts
                .filter((font) => !font.startsWith('system-ui')) // Exclude system-ui fonts
                .map((font) => {
                  const parts = font.split(',') // Split the font family string by commas
                  return parts[0].replace(/["']/g, '').trim() // Return the first part as the font name, remove quotes
                }),
              sizes, // Update state with font sizes
              weights // Update state with font weights
            })
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
    <div className='w-[400px] h-[580px] rounded-2xl flex flex-col'>
      <div className='header-part'>
        <Header />
      </div>

      {clicked ? (
        <>
          <MetaDetails />

          <div className='body-section px-4 pb-6 flex-grow'>
            <TabSection fontDetails={fontDetails} />
          </div>

          <Footer />
        </>
      ) : (
        <WelcomeSection handleClick={handleClick} />
      )}
    </div>
  )
}

export default App
