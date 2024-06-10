import React, { useState } from "react";
import Loader from "@/components/loader/Loader";
import Question from "../../components/question/question";
import Result from "@/components/result/result";

interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ResultState {
  correctAnswers: number;
  wrongAnswers: number;
}

const Quiz: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultState>({
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = await response.json();

      const randomizedQuestions = data.results.map((question: QuizQuestion) => {
        const { correct_answer, incorrect_answers } = question;
        const answers = [correct_answer, ...incorrect_answers];
        answers.sort(() => Math.random() - 0.5);
        return { ...question, answers };
      });

      setQuestions(randomizedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setSelectedAnswer(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer: string, index: number) => {
    setSelectedAnswerIndex(index);
    if (answer === questions[activeQuestion].correct_answer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="quiz-container">
        {loading && <Loader />}
        {!loading && !showResult && (
          <>
            {questions.length === 0 && (
              <button
                onClick={fetchQuestion}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Start Quiz
              </button>
            )}
            {questions.length > 0 && (
              <>
                <Question
                questions={questions}
                  question={questions[activeQuestion]}
                  activeQuestion={activeQuestion}
                  selectedAnswerIndex={selectedAnswerIndex}
                  setSelectedAnswerIndex={setSelectedAnswerIndex}
                  onAnswerSelected={onAnswerSelected}
                  onClickNext={onClickNext}
                />
                <div
                  className={`answer-feedback ${
                    selectedAnswer !== null ? "visible" : "hidden"
                  } ${selectedAnswer ? "correct" : "incorrect"}`}
                >
                  <span>
                    Your answer is {selectedAnswer ? "correct" : "incorrect"}.{" "}
                  </span>
                  {!selectedAnswer && (
                    <span style={{ color: "#2ecc71" }}>
                      The correct answer is:{" "}
                      <span>
                        {questions[activeQuestion].correct_answer}
                      </span>
                    </span>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {showResult && <Result questions={questions} result={result} />}
      </div>
    </div>
  );
};

export default Quiz;
