import { useState } from 'react'
import './App.css'
import StartScreen from './Components/StartScreen'

function App() {
  const [startScreen, setStartScreen] = useState(true)

  const handleStart = () => {
    setStartScreen(false)
  }

  return (
    <div>
      {startScreen && <StartScreen onStart={handleStart} />}
    </div>
  )
}

export default App