import type { NextPage } from "next";

import { CourseHero, Keypoints, Curriculum } from "components/course";
import { Modal } from "components/common";

const Course: NextPage = () => (
  <>
    <CourseHero />
    <Keypoints />
    <Curriculum />
    <Modal />
  </>
);

export default Course;
