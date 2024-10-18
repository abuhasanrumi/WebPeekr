import { TbCoffee } from 'react-icons/tb'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const Footer = () => {
  return (
    <div className='footer-section px-4 pb-4 '>
      <div className='coffee-area rounded-xl border flex justify-between items-center gap-3 px-4 py-2 cursor-pointer'>
        <div className='coffee-icon'>
          <TbCoffee fontSize='35px' />
        </div>
        <div className='footer-details flex-auto'>
          <p className='text-gray-600 text-sm'>Enjoying Pullweb?</p>
          <p className='font-semibold text-lg'>Buy us a coffee!</p>
        </div>
        <div className='footer-arrow'>
          <IoIosArrowForward fontSize='20px' />
        </div>
      </div>
    </div>
  )
}

export default Footer
