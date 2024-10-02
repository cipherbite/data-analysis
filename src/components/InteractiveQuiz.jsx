import React, { useState, useEffect } from 'react';

const questions = [
  {
    question: "What is the primary purpose of data visualization?",
    options: [
      "To make data look pretty",
      "To identify patterns and trends in data",
      "To hide complex information",
      "To confuse the audience"
    ],
    correctAnswer: 1
  },
  {
    question: "Which of the following is NOT a measure of central tendency?",
    options: ["Mean", "Median", "Mode", "Range"],
    correctAnswer: 3
  },
  {
    question: "What type of chart is best for showing the distribution of a dataset?",
    options: ["Pie chart", "Bar chart", "Histogram", "Line chart"],
    correctAnswer: 2
  },
  {
    question: "What does 'outlier' mean in data analysis?",
    options: [
      "A data point that is significantly different from other observations",
      "The average of a dataset",
      "A type of chart",
      "A statistical test"
    ],
    correctAnswer: 0
  },
  {
    question: "Which Python library is commonly used for data manipulation and analysis?",
    options: ["NumPy", "Matplotlib", "Pandas", "Seaborn"],
    correctAnswer: 2
  }
];

const InteractiveQuiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowFeedback(true);
    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      onQuizComplete(score + 1);
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {!showResult ? (
        <>
          <div className="mb-4 bg-gray-200 rounded-full">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progressPercentage}%` }}
            >
              {`${Math.round(progressPercentage)}%`}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h2>
          <p className="mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-2 rounded ${
                  selectedAnswer === index
                    ? index === questions[currentQuestion].correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className={`mt-4 p-2 rounded ${selectedAnswer === questions[currentQuestion].correctAnswer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {selectedAnswer === questions[currentQuestion].correctAnswer ? "Correct!" : `Incorrect. The correct answer is: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`}
            </div>
          )}
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-4">Your score: {score} out of {questions.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${(score / questions.length) * 100}%`}}></div>
          </div>
          <p className="mb-4">
            {score === questions.length 
              ? "Perfect score! You're a data analysis expert!" 
              : score >= questions.length / 2 
                ? "Good job! You're on your way to becoming a data analysis pro." 
                : "Keep studying! You're making progress in data analysis."}
          </p>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
              setSelectedAnswer(null);
              setShowFeedback(false);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveQuiz;