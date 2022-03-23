import { FC } from "react";

import { MarketplaceHeader } from "components/ui/marketplace";
import { OwnedCourseCard } from "components/ui/course";
import { Button, Message } from "components/ui/common";
import { useOwnedCourses, useAccount } from "components/hooks/web3";
import getAllCourses from "content/courses/fetcher";
import { Course } from "utils/types";

interface Props {
  courses: Course[];
}

const OwnedCourses: FC<Props> = ({ courses }) => {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  console.log(ownedCourses);

  return (
    <>
      {JSON.stringify(ownedCourses.data)}
      <MarketplaceHeader />
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message message="My custom message!" />
          <Button text="Watch the course" />
        </OwnedCourseCard>
      </section>
    </>
  );
};

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

export default OwnedCourses;
