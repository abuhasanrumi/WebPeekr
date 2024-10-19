import React from 'react'
import SectionTitle from './SectionTitle'

const ColorSection = () => {
  const colors = ['#0d0c21', '#ffffff', '#f9db87', '#f3afe4', '#d7b9ec']

  // Function to calculate if a color is dark or light
  const isColorDark = (color) => {
    // Convert hex to RGB
    const rgb = parseInt(color.slice(1), 16) // Strip the '#' and convert
    const r = (rgb >> 16) & 0xff // Extract the red component
    const g = (rgb >> 8) & 0xff // Extract the green component
    const b = (rgb >> 0) & 0xff // Extract the blue component

    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

    // Return true if luminance is low (dark), false otherwise
    return luminance < 128
  }

  return (
    <div className='color-data'>
      <SectionTitle title='Site Color' />

      <div className='colors-list grid grid-cols-3 gap-2 mt-2'>
        {colors.map((color) => (
          <div
            key={color}
            className='single-color-name flex justify-between items-end text-[14px] font-semibold h-[80px] rounded-md uppercase p-3 cursor-pointer'
            style={{
              backgroundColor: color,
              color: isColorDark(color) ? '#ffffff' : '#000000',
              border: color == '#ffffff' ? '1px solid #dfdfdf' : 0
            }}>
            {color}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorSection
