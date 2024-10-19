import TabSection from './Components/TabSection'
import Header from './Components/Header'
import Footer from './Components/Footer'
import MetaDetails from './Components/SharedElements/MetaDetails'

function App() {
  return (
    <div className='flex gap-4'>
      <div className='w-[400px] h-[580px] rounded-2xl flex flex-col'>
        <div className='header-part'>
          <Header />
          <MetaDetails />
        </div>

        {/* The body section will grow to take up available space */}
        <div className='body-section px-4 pb-6 flex-grow'>
          <TabSection />
        </div>

        {/* Footer stays at the bottom */}
        <Footer />
      </div>

      {/* <img src='1.png' className='opacity-100' /> */}
    </div>
  )
}

export default App
