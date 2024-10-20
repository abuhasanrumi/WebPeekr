import copy from 'copy-to-clipboard'
import React, { useState } from 'react'

const Tablet = ({ idx, text }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    copy(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div
      onClick={handleCopy}
      key={idx}
      className={`relative px-3 py-1 border rounded-full text-sm cursor-pointer transition-all duration-300 ${
        isCopied
          ? 'bg-primary text-white'
          : 'bg-white text-black border-gray-300'
      }`}>
      {/* Text with opacity transition */}
      <span
        className={`transition-opacity duration-300 ${
          isCopied ? 'opacity-0' : 'opacity-100'
        }`}>
        {text}
      </span>

      {/* Checkmark only when copied */}
      <span
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
          isCopied ? 'opacity-100' : 'opacity-0'
        }`}>
        ✔
      </span>
    </div>
  )
}

export default Tablet
