import React from 'react'
import SectionTitle from './SectionTitle'
import { AiFillDribbbleCircle } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MetaDetails = ({ headerDetails }) => {
  return (
    <div className='meta-details-section px-4 pt-6'>
      <SectionTitle title='General' />
      <p className='text-xl mt-2 font-medium line'>{headerDetails?.title}</p>

      <div className='url-section flex gap-2 items-center mt-2 mb-4'>
        {headerDetails?.favIconUrl ? (
          <img
            src={headerDetails?.favIconUrl}
            className='h-[25px] w-[25px]'
            alt=''
          />
        ) : (
          <Skeleton width='25' height='25' circle />
        )}
        <p className='website-url text-gray-600 font-medium text-[14px]'>
          {headerDetails?.url}
        </p>
      </div>
    </div>
  )
}

export default MetaDetails
