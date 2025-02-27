import { useRef } from "react";
import PropTypes from "prop-types";

export default function Answers({ answers, quizState, onSelect }) {
  const shuffledAnswers = useRef();

  if (quizState.name === "asking") {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer, idx) => {
        let className = undefined;
        if (
          answer === quizState.selectedAnswer &&
          quizState.name !== "asking"
        ) {
          if (quizState.name === "waiting") {
            className = "selected";
          } else if (answers[0] === quizState.selectedAnswer) {
            className = "correct";
          } else {
            className = "wrong";
          }
        }
        return (
          <li key={idx} className="answer">
            <button
              type="button"
              onClick={() =>
                quizState.name === "asking" ? onSelect(answer) : {}
              }
              className={className}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// Prop validation
Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  quizState: PropTypes.shape({
    name: PropTypes.string,
    userAnswers: PropTypes.arrayOf(PropTypes.string),
    selectedAnswer: PropTypes.string,
    timer: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
