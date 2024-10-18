import React from 'react'
import SectionTitle from './SectionTitle'

const FontSection = () => {
  const fontFamilies = [
    { name: 'Mona Sans', category: 'Sans-serif' },
    { name: 'Helvetica Neue', category: 'Sans-serif' }
  ]
  const fontSizes = [
    '42px',
    '42px',
    '42px',
    '42px',
    '42px',
    '42px',
    '42px',
    '42px'
  ]
  return (
    <div className='font-data'>
      <div className='font-family-data mb-4'>
        <SectionTitle title='Font Family' />

        <div className='font-names mt-2'>
          {fontFamilies.map((font, idx) => (
            <div
              key={idx}
              className='single-font-name-section flex justify-between items-center py-0.5'>
              <div className='font-name-text text-[14px] font-semibold'>
                {font.name}
              </div>
              <div className='font-name-category text-[12px] font-medium text-gray-600'>
                {font.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='font-size-data'>
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
    </div>
  )
}

export default FontSection
