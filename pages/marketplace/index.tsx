import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { WalletBar, EthRates } from "components/ui/web3";
import { CourseList, CourseCard } from "components/ui/course";
import getAllCourses from "content/courses/fetcher";
import { Course } from "utils/types";
import { useAccount, useNetwork } from "components/hooks/web3";
import { Button } from "components/ui/common";
import { OrderModal } from "components/ui/order";
import useEthPrice from "components/hooks/useEthPrice";

interface Props {
  courses: Course[];
}

const Marketplace: NextPage<Props> = ({ courses }: Props) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { eth } = useEthPrice();

  const { account } = useAccount();
  const { network } = useNetwork();
  return (
    <>
      <WalletBar
        account={account.data}
        network={network.data}
        target={network.target}
        isSupported={network.isSupported}
        hasInitialResponse={network.hasInitialResponse}
      />
      <EthRates eth={eth.data} ethPerItem={eth.perItem} />
      <CourseList courses={courses}>
        {/* Not sure if I like this pattern, maybe change. Interesting practice though */}
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <Button
                  variant="lightPurple"
                  text="Purchase"
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
