/* eslint-disable comma-dangle */
import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { CourseList, CourseCard } from "components/ui/course";
import getAllCourses from "content/courses/fetcher";
import { Course, IOrder } from "utils/types";
import { useWalletInfo } from "components/hooks/web3";
import { Button } from "components/ui/common";
import { OrderModal } from "components/ui/order";
import { MarketplaceHeader } from "components/ui/marketplace";
import { useWeb3 } from "components/providers";

interface Props {
  courses: Course[];
}

const Marketplace: NextPage<Props> = ({ courses }: Props) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { web3, contract } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();

  // TODO: Move purchaseCourse to a custom hook
  const purchaseCourse = async (order: IOrder) => {
    if (!web3 || !selectedCourse || !contract) {
      return console.error("Error: no web3, selectedCourse or contract");
    }

    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    const value = web3.utils.toWei(String(order.price));
    let proof;

    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );

    const emailHash = web3.utils.sha3(order.email);

    if (emailHash && orderHash) {
      proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      );
    } else {
      return console.error("Error: Failed to hash proof");
    }

    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: account.data, value });

      return result;
    } catch {
      return console.error("Purchase course: Operation has failed.");
    }
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
