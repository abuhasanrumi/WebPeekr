import React, { useState } from 'react'
import TabSection from './Components/TabSection'
import Header from './Components/Header'
import Footer from './Components/Footer'
import MetaDetails from './Components/SharedElements/MetaDetails'
import WelcomeSection from './Components/SharedElements/WelcomeSection'

function App() {
  const [clicked, setClicked] = useState(false)

  const [headerDetails, setHeaderDetails] = useState({
    title: '',
    url: '',
    favIconUrl: ''
  })

  // State to store font families, sizes, weights, and colors
  const [fontDetails, setFontDetails] = useState({
    families: [],
    sizes: [],
    weights: []
  })

  const [colorDetails, setColorDetails] = useState([])

  // Function triggered when the button is clicked
  const handleClick = () => {
    setClicked(true)

    // Step 1: Get the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0] // Get the current active tab

      // Update header details (tab title, URL, and favicon)
      setHeaderDetails({
        title: currentTab?.title,
        url: new URL(currentTab?.url).hostname,
        favIconUrl: currentTab?.favIconUrl
      })

      // Inject getFontsAndColors function into the active tab
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTab.id },
          function: getFontsAndColors // Inject the function to extract styles
        },
        (results) => {
          if (results && results[0]) {
            const { fonts, sizes, weights, colors } = results[0].result // Destructure results

            // Update font details with families, sizes, and weights
            setFontDetails({
              families: fonts
                .filter((font) => !font.startsWith('system-ui')) // Exclude system-ui fonts
                .map((font) => {
                  const parts = font.split(',') // Split the font family string by commas
                  return parts[0].replace(/["']/g, '').trim() // Clean up font name
                }),
              sizes,
              weights
            })

            // Update color details with hex codes
            setColorDetails(colors)
          } else {
            console.error('No results found or script execution failed.')
          }
        }
      )
    })
  }

  // Function injected into the webpage to extract fonts, sizes, weights, and colors
  function getFontsAndColors() {
    const fonts = new Set() // To store unique font families
    const sizes = new Set() // To store unique font sizes
    const weights = new Set() // To store unique font weights
    const colors = new Set()
    const elements = document.querySelectorAll('*') // Select all elements on the page

    elements.forEach((el) => {
      const computedStyle = window.getComputedStyle(el) // Get the computed style of the element
      fonts.add(computedStyle.fontFamily) // Add the font family to the set
      sizes.add(computedStyle.fontSize) // Add the font size to the set
      weights.add(computedStyle.fontWeight) // Add the font weight to the set
      colors.add(computedStyle.color)
      colors.add(computedStyle.backgroundColor ?? computedStyle.backgroundColor)
      colors.add(computedStyle.borderColor ?? computedStyle.borderColor)
    })

    // Return the fonts, sizes, and weights as arrays
    return {
      fonts: Array.from(fonts), // Convert the Set to an Array
      sizes: Array.from(sizes),
      weights: Array.from(weights),
      colors: Array.from(colors).filter(Boolean)
    }
  }

  return (
    <div className='w-[400px] h-auto rounded-2xl flex flex-col'>
      <div className='header-part'>
        <Header />
      </div>

      {clicked ? (
        <>
          <MetaDetails headerDetails={headerDetails} />
          <TabSection fontDetails={fontDetails} colorDetails={colorDetails} />
          <Footer />
        </>
      ) : (
        <WelcomeSection handleClick={handleClick} />
      )}
    </div>
  )
}

export default App
