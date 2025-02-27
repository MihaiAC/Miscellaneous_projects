import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import PropTypes from "prop-types";

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  quizState,
}) {
  return (
    <div id="question">
      <QuestionTimer
        key={quizState.name}
        timeLimit={quizState.timer}
        onTimeout={
          quizState.name === "asking"
            ? () => onSelectAnswer({ type: "startAsking", payload: null })
            : quizState.name === "waiting"
              ? () => onSelectAnswer({ type: "showValidity" })
              : () => onSelectAnswer({ type: "startAsking" })
        }
        mode={quizState.name === "waiting" ? "answered" : undefined}
      />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        quizState={quizState}
        onSelect={onSelectAnswer}
      />
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
