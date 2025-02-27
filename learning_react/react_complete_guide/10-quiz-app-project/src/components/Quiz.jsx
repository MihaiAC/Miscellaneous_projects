import { useCallback, useReducer } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

const initialState = {
  name: "asking",
  userAnswers: [],
  selectedAnswer: null,
  timer: 10000,
};

function quizReducer(state, action) {
  if (action.type === "startWaiting") {
    return {
      userAnswers: [...state.userAnswers],
      name: "waiting",
      selectedAnswer: action.payload,
      timer: 1000,
    };
  } else if (action.type === "showValidity") {
    return {
      userAnswers: [...state.userAnswers],
      name: "showing",
      timer: 3000,
      selectedAnswer: state.selectedAnswer,
    };
  } else {
    const newState = { ...state };
    newState.userAnswers = [...state.userAnswers];
    newState.userAnswers.push(newState.selectedAnswer);
    newState.selectedAnswer = null;
    newState.timer = 10000;
    newState.name = "asking";
    return newState;
  }
}

// Should replace state names and action types with Enums.
export default function Quiz() {
  const [quizState, dispatch] = useReducer(quizReducer, initialState);
  const activeQuestionIdx = quizState.userAnswers.length;
  const isQuizFinished = activeQuestionIdx === QUESTIONS.length;

  const callDispatcher = useCallback(function handleSelectAnswer({
    type,
    payload,
  }) {
    dispatch({ type, payload });
  }, []);

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
        onSelectAnswer={callDispatcher}
        quizState={quizState}
        key={activeQuestionIdx}
      />
    </div>
  );
}
