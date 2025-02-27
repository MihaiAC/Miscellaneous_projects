import { useContext } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import { QuizContext } from "./QuizContext.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const { quizState, dispatch } = useContext(QuizContext);
  const activeQuestionIdx = quizState.userAnswers.length;
  const isQuizFinished = activeQuestionIdx === QUESTIONS.length;

  if (isQuizFinished) {
    return <Summary />;
  }

  return (
    <div id="quiz">
      <Question
        questionText={QUESTIONS[activeQuestionIdx].text}
        answers={QUESTIONS[activeQuestionIdx].answers}
        onSelectAnswer={dispatch}
        key={activeQuestionIdx}
      />
    </div>
  );
}
