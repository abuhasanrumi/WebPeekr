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

  const [fontDetails, setFontDetails] = useState({
    families: [],
    sizes: [],
    weights: []
  })

  const [colorDetails, setColorDetails] = useState([])
  const [images, setImages] = useState([])

  const systemFonts = [
    '-apple-system',
    'system-ui',
    'BlinkMacSystemFont',
    'Segoe UI',
    'monospace',
    'Helvetica',
    'sans-serif'
  ]

  const handleClick = () => {
    setClicked(true)

    // Get the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0] // Get the current active tab

      setHeaderDetails({
        title: currentTab?.title,
        url: new URL(currentTab?.url).hostname,
        favIconUrl: currentTab?.favIconUrl
      })

      // Inject getFontsAndColorsAndImages function into the active tab
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTab.id },
          function: getFontsAndColorsAndImages
        },
        (results) => {
          if (results && results[0]) {
            const { fonts, sizes, weights, colors, images } = results[0].result
            console.log('sizes', sizes)
            // Update font details with families, sizes, and weights
            setFontDetails({
              families: Array.from(
                new Set(
                  fonts
                    .filter((font) => {
                      const parts = font
                        .split(',')
                        .map((part) => part.replace(/["']/g, '').trim())

                      return !parts.some((part) => systemFonts.includes(part))
                    })
                    .map((font) => {
                      const parts = font
                        .split(',')
                        .map((part) => part.replace(/["']/g, '').trim())
                      return parts[0]
                    })
                )
              ),
              sizes: sizes.filter((size) => {
                const numericValue = parseFloat(size)
                return numericValue >= 12 && numericValue <= 40
              }),
              weights
            })

            setColorDetails(colors)
            setImages(images)
          } else {
            console.error('No results found or script execution failed.')
          }
        }
      )
    })
  }

  // Function injected into the webpage to extract fonts, sizes, weights, colors, and image URLs
  function getFontsAndColorsAndImages() {
    const fonts = new Set()
    const sizes = new Set()
    const weights = new Set()
    const colors = new Set()
    const images = new Set()
    const elements = document.querySelectorAll('*')

    elements.forEach((el) => {
      const computedStyle = window.getComputedStyle(el)
      fonts.add(computedStyle.fontFamily)
      sizes.add(computedStyle.fontSize)
      weights.add(computedStyle.fontWeight)
      colors.add(computedStyle.color)
      colors.add(computedStyle.backgroundColor)
      colors.add(computedStyle.borderColor)
    })

    const imgElements = document.querySelectorAll('img')

    imgElements.forEach((img) => {
      if (img.src) {
        images.add(img.src)
      }
    })

    // Add background image URLs from elements with background images
    elements.forEach((el) => {
      const bgImage = window.getComputedStyle(el).backgroundImage
      if (bgImage && bgImage !== 'none') {
        const urlMatch = bgImage.match(/url\(["']?([^"']*)["']?\)/)
        if (urlMatch && urlMatch[1]) {
          images.add(urlMatch[1])
        }
      }
    })

    // Collect all statically written SVGs
    const svgElements = document.querySelectorAll('svg')
    svgElements.forEach((svg) => {
      images.add(svg.outerHTML)
    })

    return {
      fonts: Array.from(fonts),
      sizes: Array.from(sizes),
      weights: Array.from(weights),
      colors: Array.from(colors).filter(Boolean),
      images: Array.from(images)
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
          <TabSection
            images={images}
            fontDetails={fontDetails}
            colorDetails={colorDetails}
          />
          <Footer />
        </>
      ) : (
        <WelcomeSection handleClick={handleClick} />
      )}
    </div>
  )
}

export default App
