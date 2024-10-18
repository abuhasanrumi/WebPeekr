import Content from './Components/Content'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  return (
    <div className='flex gap-4'>
      <div className='w-[400px] rounded-2xl'>
        <Header />

        <Content />

        <Footer />
      </div>
      {/* <img src='1.png' className='opacity-100' /> */}
    </div>
  )
}

export default App
