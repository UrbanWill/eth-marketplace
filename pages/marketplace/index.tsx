import type { NextPage, GetStaticProps } from "next";
import { WalletBar } from "components/ui/web3";
import { CourseList } from "components/ui/course";
import getAllCourses from "content/courses/fetcher";
import { Course } from "utils/types";
import useAccount from "components/hooks/web3/useAccount";

interface Props {
  courses: Course[];
}

const Marketplace: NextPage<Props> = ({ courses }: Props) => {
  const { account } = useAccount();
  return (
    <>
      <WalletBar account={account.data} />
      <CourseList courses={courses} />
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
