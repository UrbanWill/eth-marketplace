import { FC } from "react";
import { useAccount, useManagedCourses } from "components/hooks/web3";

import { ManagedCourseCard, CourseFilter } from "components/ui/course";
import { MarketplaceHeader } from "components/ui/marketplace";
import { Button } from "components/ui/common";
import { IPurchasedCourse } from "utils/types";

const ManageCourses: FC = () => {
  const { account } = useAccount();
  const { managedCourses } = useManagedCourses(account.data);

  return (
    <>
      <MarketplaceHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course: IPurchasedCourse) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <div className="flex mr-2 relative rounded-md">
              <input
                type="text"
                name="account"
                id="account"
                className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                placeholder="0x2341ab..."
              />
              <Button text="Verify" />
            </div>
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
};

export default ManageCourses;
