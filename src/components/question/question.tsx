import React from "react";
import AnswerOption from "../answer-option/index";

interface Props {
  questions: any;
  question: any;
  activeQuestion: number;
  selectedAnswerIndex: number | null;
  setSelectedAnswerIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onClickNext: () => void;
  onAnswerSelected: (answer: string, index: number) => void;
}

const Question: React.FC<Props> = ({
  questions,
  question,
  activeQuestion,
  selectedAnswerIndex,
  setSelectedAnswerIndex,
  onClickNext,
  onAnswerSelected,
}) => {
  const addLeadingZero = (number: number) =>
    number > 9 ? number : `0${number}`;

  return (
    <div>
      <div>
        <span className="active-question-no">
          {addLeadingZero(activeQuestion + 1)}
        </span>
        <span className="total-question">
          /{addLeadingZero(questions?.length)}
        </span>
      </div>
      <h2>{question?.question}</h2>
      <ul>
        {question?.answers?.map((ans:any, index:number) => (
          <AnswerOption
            key={ans}
            answer={ans}
            index={index}
            selected={selectedAnswerIndex === index}
            onAnswerSelected={() => onAnswerSelected(ans, index)}
          />
        ))}
      </ul>
      <div className="flex-right">
        <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
          {activeQuestion === questions?.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Question;
