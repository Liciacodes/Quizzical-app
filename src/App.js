import React, { useState, useEffect } from "react";
import "./App.css";
import IntroPage from "./Pages/IntroPage";
import Questions from "./Pages/Questions";

function App() {
  const [questions, setQuestion] = useState([]);
  const [start, setStart] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.results);
      });
  }, []);

  const questionList =
    questions.length > 0 &&
    questions.map((question, index) => (
      <Questions
        key={index}
        question={question}
        selectAnswer={(option, question) => selectAnswer(option, question)}
      />
    ));

  function selectAnswer(option, question) {
      setSelectedAnswers();
    console.log(option, question);
  }

  return (
    <div className="App">
      {!start && <IntroPage onStart={() => setStart(true)} />}
      {start && <section>{questionList}</section>}
      {questions.length > 0 && start && (
        <button className="header-button new">check</button>
      )}
    </div>
  );
}

export default App;
