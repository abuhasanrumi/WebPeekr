import React, { useState } from 'react'
import SectionTitle from './SectionTitle'
import { FiCheck } from 'react-icons/fi' // Import a check icon from react-icons
import copy from 'copy-to-clipboard'
import Color from 'color'

const ColorSection = ({ colorDetails }) => {
  const [copiedColor, setCopiedColor] = useState(null) // Track which color is copied

  // Function to convert any color to HEX using the color library
  const convertToHex = (color) => {
    try {
      return Color(color).hex() // Convert to HEX using color library
    } catch (error) {
      console.error(`Error converting color ${color}:`, error)
      return null
    }
  }

  // Process the colors, convert to HEX, remove duplicates, and filter out invalid colors
  const processedColors = [
    ...new Set(colorDetails.map(convertToHex).filter(Boolean))
  ]

  // Function to calculate if a color is dark or light
  const isColorDark = (color) => {
    const rgb = parseInt(color.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luminance < 128
  }

  // Handle color copy and trigger the animation
  const handleCopy = (color) => {
    copy(color)
    setCopiedColor(color) // Set the copied color
    setTimeout(() => setCopiedColor(null), 3000) // Reset after 2 seconds
  }

  return (
    <div className='color-data'>
      <SectionTitle title='Site Color' />

      <div className='colors-list grid grid-cols-3 gap-2 mt-2'>
        {processedColors.map((color) => (
          <div
            onClick={() => handleCopy(color)} // Correctly pass the color to handleCopy
            key={color}
            className='single-color-name relative flex justify-center items-center text-[14px] font-semibold h-[80px] rounded-md uppercase p-3 cursor-pointer'
            style={{
              backgroundColor: color,
              color: isColorDark(color) ? '#ffffff' : '#000000',
              border: color === '#ffffff' ? '1px solid #dfdfdf' : 'none'
            }}>
            {/* Color text fades out when copied */}
            <span
              className={`color-text transition-opacity duration-500 ${
                copiedColor === color ? 'opacity-0' : 'opacity-100'
              }`}>
              {color}
            </span>

            {/* Check icon appears in the center with animation */}
            {copiedColor === color && (
              <FiCheck
                className='absolute check-icon'
                style={{
                  color: isColorDark(color) ? '#ffffff' : '#000000',
                  animation: 'checkGrow 0.5s ease-in-out forwards' // CSS animation
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes checkGrow {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }

        .check-icon {
          font-size: 24px;
        }

        .color-text {
          transition: opacity 0.5s;
        }
      `}</style>
    </div>
  )
}

export default ColorSection
