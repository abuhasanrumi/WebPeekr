import React from 'react'
import { MdManageSearch } from 'react-icons/md'

const WelcomeSection = ({ handleClick }) => {
  return (
    <div className='p-4'>
      <img
        src={'icons/icon.png'}
        className='h-[60px] w-[60px] my-4'
        alt='webpeekr'
      />
      <h1 className='font-sans font-semibold text-3xl mb-3'>Welcome</h1>

      <p className='section-title text-[16px] font-medium text-gray-500 text-balance'>
        Get the content of any web page in a simple and effective
      </p>

      <div className='how-to-section my-6 p-4 border rounded-xl'>
        <p className='mb-3 font-semibold text-[14px]'>How to use:</p>
        <ul className='list-disc pl-5 text-[12px]'>
          <li className='mb-2'>
            Visit the webpage from which you want to extract content.
          </li>
          <li className='mb-2'>
            Click on the extension icon in your browser toolbar.
          </li>
          <li className='mb-2'>
            Click the "Get All Contents" button within the extension.
          </li>
          <li>Your content will be displayed shortly.</li>
        </ul>
      </div>

      <button
        onClick={handleClick}
        className='bg-primary w-full rounded-full text-white py-3 text-lg uppercase'>
        Get all contents
      </button>
    </div>
  )
}

export default WelcomeSection
