import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import PropTypes from "prop-types";
import { QuizContext, QuizActionTypes, QuizStateNames } from "./QuizContext";
import { useContext } from "react";

export default function Question({ questionText, answers }) {
  const { quizState, dispatch } = useContext(QuizContext);

  // Decide what function to call on timer timeout.
  let onTimeout = () => {};
  switch (quizState.name) {
    case QuizStateNames.ASKING:
      onTimeout = () =>
        dispatch({ type: QuizActionTypes.START_ASKING, payload: null });
      break;
    case QuizStateNames.WAITING:
      onTimeout = () => dispatch({ type: QuizActionTypes.SHOW_VALIDITY });
      break;
    case QuizStateNames.SHOWING:
      onTimeout = () => dispatch({ type: QuizActionTypes.START_ASKING });
      break;
    default:
      onTimeout = () =>
        dispatch({ type: QuizActionTypes.START_ASKING, payload: null });
  }

  return (
    <div id="question">
      <QuestionTimer
        key={quizState.name}
        timeLimit={quizState.timer}
        onTimeout={onTimeout}
        mode={quizState.name === "waiting" ? "answered" : undefined}
      />
      <h2>{questionText}</h2>
      <Answers answers={answers} />
    </div>
  );
}

Question.propTypes = {
  questionText: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  quizState: PropTypes.shape({
    name: PropTypes.string,
    userAnswers: PropTypes.arrayOf(PropTypes.string),
    selectedAnswer: PropTypes.string,
    timer: PropTypes.number,
  }).isRequired,
  onSelectAnswer: PropTypes.func.isRequired,
};
