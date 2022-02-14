import { Course } from "utils/types";
import courses from "./index.json";

const getAllCourses = () => ({
  data: courses,
  courseMap: courses.reduce((acc, course, index) => {
    acc[course.id] = { ...course, index };
    return acc;
  }, {} as Record<string, Course>),
});

export default getAllCourses;
