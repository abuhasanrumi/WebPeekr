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

      {/* Checkmark with scaling animation when copied */}
      <span
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
          isCopied ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          animation: isCopied ? 'checkGrow 0.5s ease-in-out forwards' : 'none' // Animation for check icon
        }}>
        ✔
      </span>

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
      `}</style>
    </div>
  )
}

export default Tablet
