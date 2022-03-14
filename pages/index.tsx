import type { NextPage, GetStaticProps } from "next";
import { Hero } from "components/ui/common";
import { CourseList, CourseCard } from "components/ui/course";
import getAllCourses from "content/courses/fetcher";
import { Course } from "utils/types";

interface Props {
  courses: Course[];
}

const Home: NextPage<Props> = ({ courses }: Props) => (
  <>
    <Hero />
    <CourseList courses={courses}>
      {(course: Course) => <CourseCard key={course.id} course={course} />}
    </CourseList>
  </>
);
export const getStaticProps: GetStaticProps = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};

export default Home;
