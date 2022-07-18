import React from 'react'

const IntroPage = ({onStart}) => {
  return (
    <div className="center">
      <header>
        <h1 className="header-text">Quizzical</h1>
        <p className="header-paragraph">Some description if needed</p>
        <button className="header-button"  onClick={onStart}>Start Quiz</button>
      </header>
    </div>
  );
}

export default IntroPage
