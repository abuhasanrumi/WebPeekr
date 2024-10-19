import React from 'react'
import SectionTitle from './SectionTitle'

const AssetSection = () => {
  const assets = [
    'https://images.unsplash.com/photo-1728996152930-233c5aca21d7?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1729044932330-fdbc56ecef4a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1728763424935-8d2901c74515?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1618242537685-bdc08d6311b3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1684225764999-3597a8da10ab?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]

  return (
    <div className='assets-data'>
      <SectionTitle title='Images' />

      <div className='colors-list grid grid-cols-3 gap-2 mt-2'>
        {assets.map((img) => (
          <div className='single-asset h-[80px] flex items-center justify-center rounded-md cursor-pointer'>
            <img
              className='object-cover h-full w-full rounded-md'
              src={img}
              alt='image'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetSection
