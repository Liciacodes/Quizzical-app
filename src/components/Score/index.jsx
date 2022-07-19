import React, { useEffect, useState } from 'react'

const Score = ({ questions, selectedAnswers, restart }) => {
  const [score, setScore] = useState(0)

  const calculateScore = () => {
    let calcScore = 0
    questions.forEach(question => {
      const selectedAnswer =
        selectedAnswers.length > 0 &&
        selectedAnswers.find(answer => answer.question === question.question)

      if (selectedAnswer && selectedAnswer.option === question.correct_answer) {
        calcScore++
      }
    })

    setScore(calcScore)
  }

  useEffect(() => {
    calculateScore()
  }, [])

  return (
    <div className='score-cont'>
      <h2>{`You scored ${score}/5 correct answers`}</h2>
      <button onClick={() => restart()}>Play again</button>
    </div>
  )
}

export default Score
