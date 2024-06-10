import React from 'react';

interface Props {
  answer: string;
  index: number;
  selected: boolean;
  onAnswerSelected: (answer: string, index: number) => void;
}

const AnswerOption: React.FC<Props> = ({ answer, index, selected, onAnswerSelected }) => {
  return (
    <li
      onClick={() => onAnswerSelected(answer, index)}
      className={selected ? "selected-answer" : undefined}
    >
      {answer}
    </li>
  );
};

export default AnswerOption;
