import { useEffect, useState } from 'react'

const Questions = ({ question, selectAnswer, selectedAnswers, checkMode }) => {
  const [options, setOptions] = useState([])

  const selectedOption = selectedAnswers.find(
    answer => answer.question === question.question,
  )?.option

  useEffect(() => {
    const array = [...question.incorrect_answers, question.correct_answer]
    let currentIndex = array.length
    let randomIndex

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    setOptions(array)
  }, [question])

  return (
    <div className='question-div'>
      <h1 className='question-text'>{question.question}</h1>

      <div className='center-text'>
        {!checkMode &&
          options.map(option => (
            <div
              onClick={() => selectAnswer(option, question.question)}
              className={`options ${
                selectedOption && selectedOption === option ? 'active' : ''
              }`}
              key={option}
            >
              {option}
            </div>
          ))}

        {checkMode &&
          options.map(option => (
            <div
              className={`options ${
                selectedOption &&
                selectedOption === question.correct_answer &&
                option === question.correct_answer
                  ? 'correct'
                  : selectedOption !== question.correct_answer &&
                    option === selectedOption
                  ? 'wrong'
                  : question.correct_answer === option
                  ? 'correct'
                  : ''
              }`}
              key={option}
            >
              {option}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Questions
