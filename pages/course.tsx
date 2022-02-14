import type { NextPage } from "next";

import { CourseHero, Keypoints, Curriculum } from "components/course";
import { Modal } from "components/common";

const Course: NextPage = () => (
  <div className="relative max-w-7xl mx-auto px-4">
    <CourseHero />
    <Keypoints />
    <Curriculum />
    <Modal />
  </div>
);

export default Course;
