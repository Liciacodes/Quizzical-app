import React, { useState, useEffect } from 'react'
import Score from './components/Score'
import './App.css'
import IntroPage from './Pages/IntroPage'
import Questions from './Pages/Questions'

function App() {
  const [questions, setQuestion] = useState([])
  const [start, setStart] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [checkMode, setCheckMode] = useState(false)

  const getQuestions = () => {
    if (!start)
      fetch('https://opentdb.com/api.php?amount=5&difficulty=medium')
        .then(res => res.json())
        .then(data => {
          setQuestion(data.results)
        })
  }

  useEffect(() => {
    getQuestions()
  }, [start])

  const restart = () => {
    setStart(false)
    setCheckMode(false)
    setSelectedAnswers([])
  }

  function selectAnswer(option, question) {
    const answeredQuestion = selectedAnswers.find(
      answer => answer.question === question,
    )

    if (answeredQuestion) {
      answeredQuestion.option = option
      answeredQuestion.question = question

      setSelectedAnswers([
        ...selectedAnswers.map(answer =>
          answer.question === question ? answeredQuestion : answer,
        ),
      ])

      return
    }

    setSelectedAnswers([...selectedAnswers, { option, question }])
  }

  return (
    <div className='main'>
      <img src='top.png' className='top-right' />
      {!start && <IntroPage onStart={() => setStart(true)} />}
      {start && (
        <section>
          {questions.length > 0 &&
            questions.map((question, index) => (
              <Questions
                key={index}
                question={question}
                selectAnswer={selectAnswer}
                selectedAnswers={selectedAnswers}
                checkMode={checkMode}
              />
            ))}
        </section>
      )}
      {questions.length > 0 &&
        start &&
        (checkMode ? (
          <Score
            questions={questions}
            selectedAnswers={selectedAnswers}
            restart={restart}
          />
        ) : (
          <button
            onClick={() => setCheckMode(true)}
            className='header-button new'
          >
            check
          </button>
        ))}
      <img src='/bottom.png' className='bottom-left' />
    </div>
  )
}

export default App
