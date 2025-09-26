import { useEffect, useState } from "react";
import DashboardContainer from "../../../../components/Dashboard/SharedComponents/DashboardContainer/DashboardContainer";
import Button from "../../../../components/Reusable/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useGetExamByCourseIdQuery, useSubmitExamMutation } from "../../../../redux/Features/Course/courseApi";

type Option = {
  _id: string;
  text: string;
};

type Question = {
  _id: string;
  questionText: string;
  options: Option[];
  correctAnswerId: string; // only stores the correct option _id
};

type SelectedAnswer = {
  questionId: string;
  selectedOptionIndex: number;
}

const CourseExam = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetExamByCourseIdQuery(id);
  const[submitExam, {isLoading:isSubmittingExam}]=useSubmitExamMutation()
  const navigate = useNavigate();
  // prepare mcqData from API response
  const mcqData: Question[] = data?.data?.questions ?? [];
  const totalTime = (data?.data?.duration ?? 0) * 60;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (data?.data?.duration) {
      setTimeLeft(data.data.duration * 60);
    }
  }, [data?.data?.duration]);
  // countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {handleSubmitExam();return};

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // state for selected selectedAnswerwers
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);

  if (isLoading) return <p>Loading exam...</p>;

  if (!mcqData.length) {
    return <p>No questions found</p>;
  }

  // Convert seconds → mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // handle option click (by index)
  const handleSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => {
      const existing = prev.find((ans) => ans.questionId === questionId);
      if (existing) {
        return prev.map((ans) =>
          ans.questionId === questionId
            ? { ...ans, selectedOptionIndex: optionIndex }
            : ans
        );
      } else {
        return [...prev, { questionId, selectedOptionIndex: optionIndex }];
      }
    });
  };

  const isSelected = (questionId: string, optionIndex: number) => {
    return selectedAnswers.some(
      (ans) => ans.questionId === questionId && ans.selectedOptionIndex === optionIndex
    );
  };

  const handleSubmitExam = async () => {
    try {
      const payload = {
        examId:data?.data?._id,
        courseId: id,
        answers: selectedAnswers,
      };
      const res = await submitExam({data:payload}).unwrap();
      console.log("Exam submitted:", res);
      navigate(`/dashboard/exam-result/${id}`,{state:{score:res?.data?.score,passed:res?.data?.isPassed}});
    } catch (err) {
      console.error("Submit exam failed:", err);
    }
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
            <h3 className="text-neutral-10 font-medium mb-2">
              {q.questionText}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((opt,index) => (
                
                  <div
                  key={index}
                  onClick={() => handleSelect(q._id, index)}
                  className={`rounded-lg px-4 py-2 border border-primary-30 cursor-pointer transition duration-300 ease-in-out 
                    ${
                      isSelected(q._id, index)
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
          <Button
            label="Submit"
            variant="primary"
              disabled={isSubmittingExam}
            onClick={handleSubmitExam}
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default CourseExam;
