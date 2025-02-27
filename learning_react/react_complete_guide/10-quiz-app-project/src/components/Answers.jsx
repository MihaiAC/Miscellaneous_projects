import { useRef, useContext } from "react";
import PropTypes from "prop-types";
import { QuizContext, QuizActionTypes, QuizStateNames } from "./QuizContext";

export default function Answers({ answers }) {
  const { quizState, dispatch } = useContext(QuizContext);

  // If the question changed, the answers also changed.
  // Thus, refresh shuffledAnswers.
  const shuffledAnswers = useRef();
  if (quizState.name === QuizStateNames.ASKING) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  let selectedAnswerClassName = undefined;
  if (quizState.name !== QuizStateNames.ASKING) {
    if (quizState.name === QuizStateNames.WAITING) {
      selectedAnswerClassName = "selected";
    } else if (answers[0] === quizState.selectedAnswer) {
      selectedAnswerClassName = "correct";
    } else {
      selectedAnswerClassName = "wrong";
    }
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer, idx) => {
        return (
          <li key={idx} className="answer">
            <button
              type="button"
              onClick={() =>
                quizState.name === QuizStateNames.ASKING
                  ? dispatch({
                      type: QuizActionTypes.START_WAITING,
                      payload: answer,
                    })
                  : {}
              }
              className={
                answer === quizState.selectedAnswer
                  ? selectedAnswerClassName
                  : undefined
              }
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
