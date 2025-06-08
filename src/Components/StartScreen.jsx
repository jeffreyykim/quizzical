function StartScreen({ onStart }) {
  return (
    <div className="start">
      <h1>Quizzical</h1>
      <p>
        A fun and interactive quiz app that challenges your knowledge across
        various topics with timed questions and instant feedback.
      </p>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  )
}

export default StartScreen