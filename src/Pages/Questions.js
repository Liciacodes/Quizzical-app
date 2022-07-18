
const Questions = ({question, selectAnswer}) => {
  

    function shuffle(array) {
      let currentIndex = array.length;
      let randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }
  
  return (
    <div className="question-div">
      <h1 className="question-text">{question.question}</h1>

      <div className="center-text">
        {shuffle([...question.incorrect_answers, question.correct_answer]).map((option) => (
          <div onClick={() => selectAnswer(option, question.question)} className="options" key={option} >
            {option}
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Questions;
