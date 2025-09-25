import React, { useEffect, useState } from "react";
import DashboardContainer from "../../../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import Button from "../../../../components/Reusable/Button/Button";
import { Navigate, useNavigate } from 'react-router-dom';

type Option = {
  _id: string;
  text: string;
};

type Question = {
  _id: string;
  question: string;
  options: Option[];
  correctAnswerId: string; // only stores the correct option _id
};

type SelectedAnswer = {
  questionId: string;
  selectedId: string;
};

const CourseExam = () => {
  const navigate =useNavigate()
  const mcqData: Question[] = [
    {
      _id: "q1",
      question: "Which of the following is a JavaScript framework?",
      options: [
        { _id: "a", text: "React" },
        { _id: "b", text: "Laravel" },
        { _id: "c", text: "Django" },
        { _id: "d", text: "Flask" },
      ],
      correctAnswerId: "a",
    },
    {
      _id: "q2",
      question: "What does CSS stand for?",
      options: [
        { _id: "a", text: "Computer Style Sheets" },
        { _id: "b", text: "Cascading Style Sheets" },
        { _id: "c", text: "Creative Style Syntax" },
        { _id: "d", text: "Control Style Sheets" },
      ],
      correctAnswerId: "b",
    },
    {
      _id: "q3",
      question: "Which HTML tag is used to define an unordered list?",
      options: [
        { _id: "a", text: "<ul>" },
        { _id: "b", text: "<ol>" },
        { _id: "c", text: "<li>" },
        { _id: "d", text: "<list>" },
      ],
      correctAnswerId: "a",
    },
    {
      _id: "q4",
      question: "Which of the following is NOT a programming language?",
      options: [
        { _id: "a", text: "Python" },
        { _id: "b", text: "Java" },
        { _id: "c", text: "HTML" },
        { _id: "d", text: "C++" },
      ],
      correctAnswerId: "c",
    },
  ];

  // total time = number of questions in minutes
  const totalTime = mcqData.length * 60; // in seconds
  const [timeLeft, setTimeLeft] = useState(totalTime);

  // state for selected selectedAnswerwers
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert seconds → mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // handle option click
  const handleSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => {
      const existing = prev.find(
        (selectedAnswer) => selectedAnswer.questionId === questionId
      );
      if (existing) {
        return prev.map((selectedAnswer) =>
          selectedAnswer.questionId === questionId
            ? { ...selectedAnswer, selectedId: optionId }
            : selectedAnswer
        );
      } else {
        return [...prev, { questionId, selectedId: optionId }];
      }
    });
  };

  const isSelected = (questionId: string, optionId: string) => {
    return selectedAnswers.some(
      (selectedAnswer) =>
        selectedAnswer.questionId === questionId &&
        selectedAnswer.selectedId === optionId
    );
  };

  return (
    <div className="flex items-center justify-center">
      <DashboardContainer
        headerText="Course Name"
        className="w-[70%]"
        div={
          <div className="text-right mb-4 text-lg font-semibold text-primary-10 px-2 py-1 border border-accent-5 rounded-lg">
            ⏱ Time Left: {formatTime(timeLeft)}
          </div>
        }
      >
        {mcqData.map((q) => (
          <div key={q._id} className="bg-neutral-105/10 p-4 rounded-lg mb-4">
            <h3 className="text-neutral-10 font-medium mb-2">{q.question}</h3>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((opt) => (
                <div
                  key={opt._id}
                  onClick={() => handleSelect(q._id, opt._id)}
                  className={`rounded-lg px-4 py-2 border border-primary-30 cursor-pointer transition duration-300 ease-in-out 
                    ${
                      isSelected(q._id, opt._id)
                        ? "bg-primary-20 text-white"
                        : "bg-primary-30/20 hover:bg-primary-20 hover:text-white"
                    }`}
                >
                  {opt.text}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-end  gap-4">
          <Button label="Cancel" variant="secondary" />
          <Button label="Submit" variant="primary" onClick={()=>{navigate("/dashboard/exam-result/:id")}} />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default CourseExam;
