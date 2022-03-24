import { FC } from "react";

import { IPurchasedCourse } from "utils/types";
import ManagedCourseCardItem from "./managedCourseCardItem";

interface Props {
  course: IPurchasedCourse;
}

const ManagedCourseCard: FC<Props> = ({ children, course }) => (
  <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
    <div className="border-t border-gray-200">
      <ManagedCourseCardItem title="Course ID:" value={course.ownedCourseId} />
      <ManagedCourseCardItem title="Proof:" value={course.proof} />
      <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
    </div>
  </div>
);

export default ManagedCourseCard;
