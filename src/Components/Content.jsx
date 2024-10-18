import { AiFillDribbbleCircle } from 'react-icons/ai'
import { useState } from 'react'
import SectionTitle from './SharedElements/SectionTitle'
import FontSection from './SharedElements/FontSection'

const Content = () => {
  const [tab, setTab] = useState('font')
  const tabs = ['Font', 'Color', 'Assets']
  console.log('tab', tab)
  return (
    <div className='body-section px-4 py-6'>
      <div className='details-section'>
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

      <div className='tab-section'>
        <div className='tabs grid grid-cols-3 text-[15px] gap-1 bg-[#f7f7f7] p-1 rounded-full'>
          {tabs.map((tabName, idx) => (
            <p
              key={idx}
              onClick={() => setTab(tabName.toLowerCase())}
              className={`px-8 py-1 text-gray-500 text-center font-medium rounded-full transition-colors cursor-pointer 
                ${
                  tab === tabName.toLowerCase()
                    ? 'bg-white text-black'
                    : 'hover:bg-white hover:text-black'
                }`}>
              {tabName}
            </p>
          ))}
        </div>
        <div className='tab-data mt-6'>{tab == 'font' && <FontSection />}</div>
      </div>
    </div>
  )
}

export default Content
