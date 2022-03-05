import type { NextPage, GetStaticProps } from "next";
import { Hero } from "components/common";
import { CourseList } from "components/course";
import getAllCourses from "content/courses/fetcher";
import { Course } from "utils/types";

interface Props {
  courses: Course;
}

const Home: NextPage<Props> = ({ courses }: Props) => (
  <>
    <Hero />
    <CourseList courses={courses} />
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
