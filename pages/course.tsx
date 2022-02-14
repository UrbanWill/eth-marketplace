import type { NextPage } from "next";
import BaseLayout from "components/layout";

import { CourseHero, Keypoints, Curriculum } from "components/course";
import { Modal } from "components/common";

const Course: NextPage = () => (
  <BaseLayout>
    <CourseHero />
    <Keypoints />
    <Curriculum />
    <Modal />
  </BaseLayout>
);

export default Course;
