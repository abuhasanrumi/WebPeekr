import React from 'react'
import { MdManageSearch } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'

const PopupComponent = () => {
  const closePopup = () => {
    window.close() // Close the Chrome extension popup
  }

  return (
    <div className='popup-container'>
      <div className='header-section flex justify-between items-center px-4 py-2 border-b'>
        <div className='header-name flex items-center gap-2'>
          <img
            src={'icons/128.png'}
            className='h-[25px] w-[25px]'
            alt='WebPeeker'
          />
          <h1 className='font-sans font-bold text-xl'>WebPeekr</h1>
        </div>
        <RxCross1
          fontSize='20px'
          className='cursor-pointer' // Add cursor pointer for better UX
          onClick={closePopup} // Close the popup on click
        />
      </div>
      {/* The rest of your popup content goes here */}
    </div>
  )
}

export default PopupComponent
