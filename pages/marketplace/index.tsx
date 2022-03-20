import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { CourseList, CourseCard } from "components/ui/course";
import getAllCourses from "content/courses/fetcher";
import { Course, IOrder } from "utils/types";
import { useWalletInfo } from "components/hooks/web3";
import { Button } from "components/ui/common";
import { OrderModal } from "components/ui/order";
import { MarketplaceHeader } from "components/ui/marketplace";

interface Props {
  courses: Course[];
}

const Marketplace: NextPage<Props> = ({ courses }: Props) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { canPurchaseCourse } = useWalletInfo();

  const purchaseCourse = (order: IOrder) => {
    alert(JSON.stringify(order));
  };

  return (
    <>
      <MarketplaceHeader />
      <CourseList courses={courses}>
        {/* Not sure if I like this pattern, maybe change. Interesting practice though */}
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={() => (
              <div className="mt-4">
                <Button
                  variant="lightPurple"
                  text="Purchase"
                  disabled={!canPurchaseCourse}
                  onHandleClick={() => setSelectedCourse(course)}
                />
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onHandleClose={() => setSelectedCourse(null)}
          onHandleSubmit={purchaseCourse}
        />
      )}
    </>
  );
};
export const getStaticProps: GetStaticProps = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};

export default Marketplace;
