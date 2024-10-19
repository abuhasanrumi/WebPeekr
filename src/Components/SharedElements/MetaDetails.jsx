import React from 'react'
import SectionTitle from './SectionTitle'
import { AiFillDribbbleCircle } from 'react-icons/ai'

const MetaDetails = () => {
  return (
    <div className='meta-details-section px-4 pt-6'>
      <SectionTitle title='General' />
      <p className='text-xl mt-2 font-medium line'>
        Dribbble - Discover the Top Designers & Creative Professionals
      </p>

      <div className='url-section flex gap-2 items-center my-4'>
        <AiFillDribbbleCircle color='#ff4081' fontSize='25px' />
        <p className='website-url text-gray-600 font-medium text-[14px]'>
          https://dribbble.com/
        </p>
      </div>
    </div>
  )
}

export default MetaDetails
