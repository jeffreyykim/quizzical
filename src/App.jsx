import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import StartScreen from './Components/StartScreen'
import QuizScreen from './Components/QuizScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App