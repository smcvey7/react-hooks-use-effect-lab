import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(()=>{
    const timeoutID = setTimeout(()=>{
      if (timeRemaining !== 0){
      setTimeRemaining((timeRemaining)=>timeRemaining-1)
    }else{
      setTimeRemaining(10);
      onAnswered(false)
    }
    }, 1000)

    return function cleanup(){
      clearTimeout(timeoutID)
    }
  })

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
