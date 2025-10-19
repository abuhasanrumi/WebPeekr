import React, { useEffect, useState } from 'react'
import SectionTitle from './SectionTitle'
import Tablet from './Tablet'
import { FiDownload } from 'react-icons/fi'

const FontSection = ({ fontDetails }) => {
  // Function to export fonts as JSON
  const exportFontsAsJSON = () => {
    const fontsData = {
      fontFamilies: fontDetails.families,
      fontSizes: fontDetails.sizes.map((size) => ({
        value: size,
        numericValue: parseFloat(size.replace('px', ''))
      })),
      fontWeights: fontDetails.weights.map((weight) => ({
        value: weight,
        numericValue: parseInt(weight) || weight
      })),
      totalFamilies: fontDetails.families.length,
      totalSizes: fontDetails.sizes.length,
      totalWeights: fontDetails.weights.length,
      exportedAt: new Date().toISOString()
    }

    const jsonString = JSON.stringify(fontsData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `webpeeker-fonts-${
      new Date().toISOString().split('T')[0]
    }.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className='font-data'>
      {/* Export JSON Button */}
      {(fontDetails.families.length > 0 ||
        fontDetails.sizes.length > 0 ||
        fontDetails.weights.length > 0) && (
        <div className='mb-4'>
          <button
            onClick={exportFontsAsJSON}
            className='w-full bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2'>
            <FiDownload className='text-sm' />
            Export Fonts as JSON
          </button>
        </div>
      )}

      {/* Section for displaying font families */}
      <div className='font-family-data mb-4'>
        <SectionTitle title='Font Family' />
        <div className='font-sizes flex gap-2 flex-wrap mt-2'>
          {fontDetails.families.map((font, idx) => (
            <Tablet idx={idx} text={font} />
          ))}
        </div>
      </div>
      {/* Section for displaying font sizes */}
      <div className='font-size-data mb-4'>
        <SectionTitle title='Font Sizes' />
        <div className='font-sizes flex gap-2 flex-wrap mt-3'>
          {fontDetails.sizes.map((size, idx) => (
            <Tablet idx={idx} text={size} />
          ))}
        </div>
      </div>
      {/* Section for displaying font weights */}
      <div className='font-weight-data'>
        <SectionTitle title='Font Weights' />
        <div className='font-weights flex gap-2 flex-wrap mt-3'>
          {fontDetails.weights.map((weight, idx) => (
            <Tablet idx={idx} text={weight} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FontSection
