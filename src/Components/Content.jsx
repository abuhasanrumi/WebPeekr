import { AiFillDribbbleCircle } from 'react-icons/ai'

const Content = () => {
  return (
    <div className='body-section p-6'>
      <div className='details-section'>
        <p className='section-title text-[14px] uppercase text-gray-600'>
          General
        </p>
        <p className='text-2xl mt-2 font-medium line'>
          Dribbble - Discover the Top Designers & Creative Professionals
        </p>

        <div className='url-section flex gap-2 items-center my-4'>
          <AiFillDribbbleCircle color='#ff4081' fontSize={'25px'} />
          <p className='website-url text-gray-600 text-[14px]'>
            https://dribbble.com/
          </p>
        </div>
      </div>

      <div className='tab-section'>
        <div className='tabs text-md bg-[#f7f7f7] p-2 rounded-full'>
          <p>Font</p>
          <p>Color</p>
          <p>Assets</p>
        </div>
      </div>
    </div>
  )
}

export default Content
