import React, { useEffect, useState } from 'react'
import SectionTitle from './SectionTitle'
import Tablet from './Tablet'

const FontSection = ({ fontDetails }) => {
  return (
    <div className='font-data'>
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
