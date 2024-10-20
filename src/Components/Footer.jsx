import { TbCoffee } from 'react-icons/tb'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { FaLinkedin } from 'react-icons/fa' // Import LinkedIn icon

const Footer = () => {
  return (
    <div className='footer-section p-4'>
      <a
        href='https://www.linkedin.com/in/abu-hasan-rumi/'
        target='_blank'
        rel='noopener noreferrer'
        className='hover:underline'>
        <div className='coffee-area flex justify-between items-center gap-3 bg-white rounded-xl border border-gray-300 p-4 cursor-pointer transition-shadow duration-300'>
          <div className='coffee-icon'>
            <TbCoffee fontSize='35px' />
          </div>
          <div className='footer-details flex-auto'>
            <p className='text-gray-600 text-sm'>Loving what you see?</p>
            <p className='font-semibold text-sm flex items-center gap-1'>
              Connect with me on LinkedIn
              <FaLinkedin className='text-blue-700' />
            </p>
          </div>
          <div className='footer-arrow'>
            <IoIosArrowForward fontSize='20px' className='text-gray-500' />
          </div>
        </div>
      </a>
    </div>
  )
}

export default Footer
