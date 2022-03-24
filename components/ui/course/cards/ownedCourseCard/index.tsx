import Image from "next/image";
import { FC } from "react";
import { IPurchasedCourse } from "utils/types";

interface Props {
  course: IPurchasedCourse;
}

interface IIndexable {
  [key: string]: string;
}

const STATE_COLORS: IIndexable = {
  purchased: "indigo",
  activated: "green",
  deactivated: "red",
};

const OwnedCourseCard: FC<Props> = ({ children, course }) => {
  const { title, ownedCourseId, proof, price, coverImage, state } = course;
  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="block md:flex">
        <div className="flex-1">
          <div className="h-72 md:h-full next-image-wrapper">
            <Image
              className="object-cover"
              src={coverImage}
              width="45"
              height="45"
              layout="responsive"
            />
          </div>
        </div>
        <div className="flex-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              <span className="mr-2">{title}</span>
              <span
                className={`text-xs text-${STATE_COLORS[state]}-700 bg-${STATE_COLORS[state]}-200 rounded-full p-2`}
              >
                {state}
              </span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {`${price} ETH`}
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <span className="text-sm font-medium text-gray-500 mr-1">
                  Course ID:
                </span>
                <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ownedCourseId}
                </span>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                <span className="text-sm font-medium text-gray-500 mr-1">
                  Proof:
                </span>
                <span className="mt-1 text-sm break-words text-gray-900 sm:mt-0 sm:col-span-2">
                  {proof}
                </span>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OwnedCourseCard;
