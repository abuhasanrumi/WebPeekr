import { useState } from 'react'
import FontSection from './SharedElements/FontSection'
import ColorSection from './SharedElements/ColorSection'
import AssetSection from './SharedElements/AssetSection'

const TabSection = ({ colorDetails, fontDetails }) => {
  const [tab, setTab] = useState('font')
  const tabs = ['Font', 'Color', 'Assets']

  return (
    <div className='tab-section px-4'>
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

      {/* Content with custom scroll styling */}
      <div className='tab-data mt-6 overflow-y-scroll scroll-container h-[200px]'>
        {tab === 'font' && <FontSection fontDetails={fontDetails} />}
        {tab === 'color' && <ColorSection colorDetails={colorDetails} />}
        {tab === 'assets' && <AssetSection />}
      </div>
    </div>
  )
}

export default TabSection
