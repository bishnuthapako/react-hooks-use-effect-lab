import { cleanup } from "@testing-library/react";
import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {


  const [timeRemaining, setTimeRemaining] = useState(10);
  // const [count, setCount]=useState(0)


  // add useEffect code

  useEffect(()=>{
   
   const timeCount = setInterval(()=>{setTimeRemaining(time=>time-1)
      if(timeRemaining === 0) {
        setTimeRemaining(10)
        onAnswered(false)

      }
  }, 1000)
  
     return function cleanup(){
        clearTimeout(timeCount)
       
     }
  }, [timeRemaining] )

  function handleAnswer(isCorrect) {
    if(timeRemaining === 0){
      return  handleAnswer()
      onAnswered()

    }
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  console.log(prompt)

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
