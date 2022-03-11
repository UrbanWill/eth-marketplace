import type { NextPage, GetStaticProps } from "next";
import { Hero } from "components/ui/common";
import { CourseList } from "components/ui/course";
import getAllCourses from "content/courses/fetcher";
import { Course, IWeb3Context } from "utils/types";
import { useWeb3 } from "components/providers";

interface Props {
  courses: Course[];
}

const Home: NextPage<Props> = ({ courses }: Props) => {
  const { test } = useWeb3() as IWeb3Context;

  console.log(test);

  return (
    <>
      <Hero />
      <CourseList courses={courses} />
    </>
  );
};
export const getStaticProps: GetStaticProps = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};

export default Home;
