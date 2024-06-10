import React from "react";

interface Props {
  questions: any[]; 
  result: {
    correctAnswers: number;
    wrongAnswers: number;
  };
}

const Result: React.FC<Props> = ({ questions, result }) => {
  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Questions Served: <span>{questions?.length}</span>
      </p>
      <p>
        Total Correct Answers: <span>{result?.correctAnswers}</span>
      </p>
      <p>
       Total Wrong Answers: <span>{result?.wrongAnswers}</span>
      </p>
    </div>
  );
};

export default Result;
