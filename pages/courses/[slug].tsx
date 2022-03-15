import type { NextPage, GetStaticPaths, GetStaticProps } from "next";

import { CourseHero, Keypoints, Curriculum } from "components/ui/course";
// import { Modal } from "components/ui/common";
import getAllCourses from "content/courses/fetcher";
import { Course as CourseInterface, IParams } from "utils/types";

interface Props {
  course: CourseInterface;
}

const Course: NextPage<Props> = ({ course }: Props) => (
  <>
    <CourseHero course={course} />
    <Keypoints points={course.wsl} />
    <Curriculum locked />
    {/* <Modal isOpen={false} /> */}
  </>
);

export const getStaticPaths: GetStaticPaths = () => {
  const { data } = getAllCourses();

  const paths = data.map((course) => ({
    params: { slug: course.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as IParams;
  const { data } = getAllCourses();
  const course = data.filter((courses) => courses.slug === slug)[0];

  return {
    props: {
      course,
    },
  };
};

export default Course;
