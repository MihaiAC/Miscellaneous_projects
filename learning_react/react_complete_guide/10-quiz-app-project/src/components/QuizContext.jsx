import { createContext, useReducer, useCallback } from "react";

// Action types.
export const QuizActionTypes = Object.freeze({
  START_WAITING: "startWaiting",
  SHOW_VALIDITY: "showValidity",
  START_ASKING: "startAsking",
});

// State names (redundant, but it makes things clearer).
export const QuizStateNames = Object.freeze({
  ASKING: "asking",
  WAITING: "waiting",
  SHOWING: "showing",
});

const initialState = {
  name: QuizStateNames.ASKING,
  userAnswers: [],
  selectedAnswer: null,
  timer: 10000,
};

function quizReducer(state, action) {
  switch (action.type) {
    case QuizActionTypes.START_WAITING:
      return {
        userAnswers: [...state.userAnswers],
        name: QuizStateNames.WAITING,
        selectedAnswer: action.payload,
        timer: 1000,
      };
    case QuizActionTypes.SHOW_VALIDITY:
      return {
        userAnswers: [...state.userAnswers],
        name: QuizStateNames.SHOWING,
        timer: 3000,
        selectedAnswer: state.selectedAnswer,
      };
    case QuizActionTypes.START_ASKING:
      return {
        userAnswers: [...state.userAnswers, state.selectedAnswer],
        selectedAnswer: null,
        timer: 10000,
        name: QuizStateNames.ASKING,
      };
    default:
      return state;
  }
}

// Create the context
export const QuizContext = createContext({
  quizState: initialState,
  dispatch: () => {},
});

// Context Provider component
export const QuizContextProvider = ({ children }) => {
  const [quizState, dispatch] = useReducer(quizReducer, initialState);

  const callDispatcher = useCallback(function handleSelectAnswer({
    type,
    payload,
  }) {
    dispatch({ type, payload });
  }, []);

  return (
    <QuizContext.Provider value={{ quizState, dispatch: callDispatcher }}>
      {children}
    </QuizContext.Provider>
  );
};
