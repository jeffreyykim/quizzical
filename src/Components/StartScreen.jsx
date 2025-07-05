import { useNavigate } from 'react-router-dom'

function StartScreen() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/quiz')
  }

  return (
    <div className="start">
      <h1>Quizzical</h1>
      <p>
        A fun and interactive quiz app that challenges your knowledge across
        various topics with timed questions and instant feedback.
      </p>
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  )
}

export default StartScreen