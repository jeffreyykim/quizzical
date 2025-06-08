import { useState } from 'react'
import './App.css'
import StartScreen from './Components/StartScreen'
import QuizScreen from './Components/QuizScreen'

function App() {
  const [startScreen, setStartScreen] = useState(true)

  const handleStart = () => {
    setStartScreen(false)
  }

  return (
    <div>
      {startScreen && <StartScreen onStart={handleStart} />}
      {!startScreen && <QuizScreen />}
    </div>
    
  )
}

export default App