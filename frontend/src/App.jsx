import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from '../components/Header/Header'
import Feed from '../pages/Feed/Feed'
import Messages from './pages/Messages/Messages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Messages />
    </>
  )
}

export default App
