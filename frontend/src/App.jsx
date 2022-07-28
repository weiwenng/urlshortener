import { useState } from 'react'
import './App.css'
import DisplayTable from './components/DisplayTable'
import Form from './components/Form'

function App() {
  const [urls, setUrls] = useState()
  return (
    <div className="App">
      <Form setUrls={setUrls}/>
      <DisplayTable urls={urls} setUrls={setUrls} />
    </div>
  )
}

export default App
