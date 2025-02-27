import { useContext } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";
import { QuizContext } from "./QuizContext.jsx";

export default function Quiz() {
  const { quizState, dispatch } = useContext(QuizContext);
  const activeQuestionIdx = quizState.userAnswers.length;
  const isQuizFinished = activeQuestionIdx === QUESTIONS.length;

  if (isQuizFinished) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz finished!</h2>
      </div>
    );
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
