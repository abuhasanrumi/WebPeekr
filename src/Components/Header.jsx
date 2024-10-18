import { MdManageSearch } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'

const Header = () => {
  return (
    <div className='header-section flex justify-between items-center px-6 py-2 border-b'>
      <div className='header-name flex items-center gap-2'>
        <MdManageSearch className='text-primary' fontSize={'40px'} />
        <h1 className='font-sans font-bold text-2xl'>Pullweb</h1>
      </div>
      <RxCross1 />
    </div>
  )
}

export default Header
