import React from "react";
import CourseCard from "../CourseCard/CourseCard";
import { IMAGES } from "../../../../assets";

const CourseSection = () => {
  const courses = [
    {
      title: "Full Stack Development",
      subTitle: "Beginner to Advanced",
      tag: "Best Seller",
      description: "Learn full-stack development from scratch.",
      image: IMAGES.courseDummyImage,
      progressData: { completed: 3, total: 14, progress: 30 },
      price: "9,500",
    },
    {
      title: "UI/UX Design",
      subTitle: "Design Stunning Interfaces",
      tag: "Trending",
      description: "Master modern UI/UX design practices.",
      image: IMAGES.courseDummyImage,
      progressData: { completed: 5, total: 20, progress: 25 },
      price: "7,000",
    },
    {
      title: "Data Science & ML",
      subTitle: "Hands-on Machine Learning",
      tag: "New",
      description: "Dive into data science with practical projects.",
      image: IMAGES.courseDummyImage,
      progressData: { completed: 10, total: 40, progress: 50 },
      price: "12,000",
    },
  ];

  return (
    <div className="mt-9">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CourseSection;
