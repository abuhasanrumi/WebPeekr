import { AiFillDribbbleCircle } from 'react-icons/ai'
import SectionTitle from './SharedElements/SectionTitle'

const Content = () => {
  const tabs = ['Font', 'Color', 'Assets']
  const fontFamilies = [
    { name: 'Mona Sans', category: 'Sans-serif' },
    { name: 'Helvetica Neue', category: 'Sans-serif' }
  ]
  const fontSizes = [
    '42px',
    '42px',
    '42px',
    '42px',
    '42px',
    '42px',
    '42px',
    '42px'
  ]

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
        <div className='tabs grid grid-cols-3 text-[16px] bg-[#f7f7f7] p-1 rounded-full'>
          {tabs.map((tab, idx) => (
            <p
              key={idx}
              className='px-8 py-2 text-gray-500 text-center font-medium rounded-full transition-colors cursor-pointer hover:bg-white hover:text-black '>
              {tab}
            </p>
          ))}
        </div>

        <div className='tab-data mt-6'>
          <div className='font-data'>
            <div className='font-family-data mb-4'>
              <SectionTitle title='Font Family' />

              <div className='font-names mt-2'>
                {fontFamilies.map((font, idx) => (
                  <div
                    key={idx}
                    className='single-font-name-section flex justify-between items-center py-0.5'>
                    <div className='font-name-text text-[14px] font-semibold'>
                      {font.name}
                    </div>
                    <div className='font-name-category text-[12px] font-medium text-gray-600'>
                      {font.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='font-size-data'>
              <SectionTitle title='Font Sizes' />
              <div className='font-sizes flex gap-2 flex-wrap mt-3'>
                {fontSizes.map((size, idx) => (
                  <p
                    key={idx}
                    className='font-size-block px-3 py-1 border rounded-full text-[14px]'>
                    {size}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
