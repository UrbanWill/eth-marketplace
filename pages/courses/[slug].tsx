import { useAccount, useOwnedCourse } from "components/hooks/web3";
import type { NextPage, GetStaticPaths, GetStaticProps } from "next";

import { CourseHero, Keypoints, Curriculum } from "components/ui/course";
import { Message } from "components/ui/common";
import getAllCourses from "content/courses/fetcher";
import {
  Course as CourseInterface,
  IParams,
  MessageVariants,
} from "utils/types";

interface Props {
  course: CourseInterface;
}

interface IIndexable {
  [key: string]: { message: string; type: MessageVariants };
}

const Course: NextPage<Props> = ({ course }: Props) => {
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);

  const { state, author } = ownedCourse?.data || {};

  const isLocked = state !== "activated";

  const MESSAGE_STATUS: IIndexable = {
    purchased: {
      message:
        "Course is purchased and waiting for the activation. Processing can take up to 24 hours.",
      type: "warning",
    },
    activated: {
      message: `${author} wishes you happy watching of the course.`,
      type: "success",
    },
    deactivated: {
      message:
        "Course has been deactivated, due the incorrect purchase data. The functionality to watch the course has been temporaly disabled.",
      type: "danger",
    },
  };

  return (
    <>
      <CourseHero course={course} hasOwner={!!ownedCourse.data} />
      <Keypoints points={course.wsl} />
      {state && (
        <div className="max-w-5xl mx-auto">
          <Message
            message={MESSAGE_STATUS[state].message}
            type={MESSAGE_STATUS[state].type}
          />
        </div>
      )}
      <Curriculum locked={isLocked} courseState={state || "deactivated"} />
      {/* <Modal isOpen={false} /> */}
    </>
  );
};

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
