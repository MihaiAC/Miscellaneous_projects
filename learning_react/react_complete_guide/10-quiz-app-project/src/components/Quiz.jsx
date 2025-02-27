import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  // 2 answers => we're at question 3 (index 2).
  const activeQuestionIdx = userAnswers.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIdx].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestionIdx].answers.map((answer, idx) => (
            <li key={idx} className="answer">
              <button type="button" onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
