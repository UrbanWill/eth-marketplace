import { FC } from "react";

import { IPurchasedCourse } from "utils/types";
import ManagedCourseCardItem from "./managedCourseCardItem";

interface Props {
  course: IPurchasedCourse;
}

const ManagedCourseCard: FC<Props> = ({ children, course }) => (
  <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
    <div className="border-t border-gray-200">
      {Object.keys(course).map((key, i) => (
        <ManagedCourseCardItem
          key={key}
          className={`${i % 2 ? "bg-gray-50" : "bg-white"}`}
          title={`${key[0].toUpperCase()}${key.slice(1)}:`}
          // @ts-expect-error here course only has keys as value pairs
          value={course[key]}
        />
      ))}
      <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
    </div>
  </div>
);

export default ManagedCourseCard;
