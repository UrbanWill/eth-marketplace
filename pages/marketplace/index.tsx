import type { NextPage, GetStaticProps } from "next";
import { WalletBar } from "components/ui/web3";
import { CourseList, CourseCard } from "components/ui/course";
import getAllCourses from "content/courses/fetcher";
import { Course } from "utils/types";
import { useAccount, useNetwork } from "components/hooks/web3";

interface Props {
  courses: Course[];
}

const Marketplace: NextPage<Props> = ({ courses }: Props) => {
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
      <CourseList courses={courses}>
        {(course) => <CourseCard key={course.id} course={course} />}
      </CourseList>
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
