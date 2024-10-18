import Content from './Components/Content'
import Header from './Components/Header'

function App() {
  return (
    <div className='flex gap-4'>
      <div className='w-[400px] h-[750px] border border-gray-200 rounded-2xl'>
        <Header />

        <Content />
      </div>
      {/* <img src='1.png' className='opacity-100' /> */}
    </div>
  )
}

export default App
