/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function QuestionTimer({ timeLimit, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeLimit);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timeout = setTimeout(onTimeout, timeLimit);

    return () => {
      console.log("CLEARING TIMEOUT");
      clearTimeout(timeout);
    };
  }, [timeLimit, onTimeout]);

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      console.log("CLEARING INTERVAL");
      clearInterval(interval);
    };
  }, [onTimeout]);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={timeLimit}
      className={mode}
    ></progress>
  );
}
