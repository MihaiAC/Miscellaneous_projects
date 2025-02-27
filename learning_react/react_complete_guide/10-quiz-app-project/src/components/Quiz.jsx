import { useCallback, useReducer } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

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
  // STATE: Asking: generate shuffledAnswers, memo them with useRef,
  // set current answer. TIMER=10s Go to waiting.
  // If null answer, go to the next question, still in state asking.
  // STATE: Waiting: identify selected answer, change its className,
  // TIMER=1s. Go to showing.
  // STATE: Showing: show whether current answer is correct, change its className,
  // TIMER=3s, add the answer to the userAnswer arrays, go back to Asking.
  // Visually, we change three things: timer, progress bar color, selected answer color.
  // Complex state object => useReducer(?)

  const [quizState, dispatch] = useReducer(quizReducer, initialState);
  const activeQuestionIdx = quizState.userAnswers.length;
  const isQuizFinished = activeQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    if (selectedAnswer === null) {
      dispatch({ type: "startAsking" });
    } else {
      dispatch({ type: "startWaiting", payload: selectedAnswer });
    }
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

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
      <div
        id="question"
        className={quizState.name === "waiting" ? "answered" : undefined}
      >
        <QuestionTimer
          key={activeQuestionIdx + quizState.name}
          timeLimit={quizState.timer}
          onTimeout={
            quizState.name === "asking"
              ? handleSkipAnswer
              : quizState.name === "waiting"
                ? () => dispatch({ type: "showValidity" })
                : () => dispatch({ type: "startAsking" })
          }
        />
        <h2>{QUESTIONS[activeQuestionIdx].text}</h2>
        <Answers
          answers={QUESTIONS[activeQuestionIdx].answers}
          quizState={quizState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
