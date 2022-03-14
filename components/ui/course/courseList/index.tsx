import { FC, ReactNode } from "react";
import { Course } from "utils/types";

interface Props {
  courses: Course[];
  children: (course: Course) => ReactNode;
}

const CourseList: FC<Props> = ({ courses, children }) => (
  <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
    {courses.map((course: Course) => children(course))}
  </section>
);
export default CourseList;
