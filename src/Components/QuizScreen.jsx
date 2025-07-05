import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizScreen() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple');
                const data = await response.json();

                const formattedQuestions = data.results.map((question) => {
                    const allAnswers = [...question.incorrect_answers, question.correct_answer];
                    return {
                        ...question,
                        answers: allAnswers.sort(() => Math.random() - 0.5),
                    };
                });

                setQuestions(formattedQuestions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerClick = (questionIndex, answer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer,
        }));
    };

    const handleCheckAnswers = () => {
        let newScore = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correct_answer) {
                newScore++;
            }
        });
        setScore(newScore);
        setShowResults(true);
    };

    const handlePlayAgain = () => {
        navigate('/');
    };

    return (
        <div className="quiz">
            {loading ? (
                <div className="loading-container">
                    <h2>Loading your quiz...</h2>
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index} className="quiz-item">
                                <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
                                <div className="quiz-answers">
                                    {question.answers.map((answer, answerIndex) => {
                                        let buttonClass = 'quiz-button';
                                        if (showResults) {
                                            if (answer === question.correct_answer) {
                                                buttonClass += ' correct';
                                            } else if (selectedAnswers[index] === answer) {
                                                buttonClass += ' incorrect';
                                            }
                                        } else if (selectedAnswers[index] === answer) {
                                            buttonClass += ' selected';
                                        }

                                        return (
                                            <button
                                                key={answerIndex}
                                                onClick={() => handleAnswerClick(index, answer)}
                                                disabled={showResults}
                                                className={buttonClass}
                                                dangerouslySetInnerHTML={{ __html: answer }}
                                            />
                                        );
                                    })}
                                </div>
                                <hr className="quiz-divider" />
                            </li>
                        ))}
                    </ul>
                    {showResults ? (
                        <div className="quiz-results">
                            <p className="quiz-score">You scored {score}/5 correct answers</p>
                            <button onClick={handlePlayAgain} className="quiz-play-again-button">
                                Play Again
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleCheckAnswers} className="quiz-check-button">
                            Check Answers
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default QuizScreen;