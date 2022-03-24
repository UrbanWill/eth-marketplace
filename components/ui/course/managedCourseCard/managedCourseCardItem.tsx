import { FC } from "react";

interface Props {
  title: string;
  value: string;
}

const ManagedCourseCardItem: FC<Props> = ({ title, value }) => (
  <div className="bg-gray-50 px-4 py-5  sm:px-6">
    <span className="text-sm font-medium text-gray-500 mr-2">{title}</span>
    <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 mr-2 break-words">
      {value}
    </span>
  </div>
);

export default ManagedCourseCardItem;
