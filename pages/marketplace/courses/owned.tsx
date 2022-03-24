import { FC } from "react";

import Link from "next/link";
import { MarketplaceHeader } from "components/ui/marketplace";
import { OwnedCourseCard } from "components/ui/course";
import { Button, Message } from "components/ui/common";
import { useOwnedCourses, useAccount } from "components/hooks/web3";
import getAllCourses from "content/courses/fetcher";
import { Course, IPurchasedCourse } from "utils/types";
import { useRouter } from "next/router";

import { useWeb3 } from "components/providers";

interface Props {
  courses: Course[];
}

const OwnedCourses: FC<Props> = ({ courses }) => {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);
  const { requireInstall } = useWeb3();
  const router = useRouter();

  const { isEmpty, data } = ownedCourses;

  const getMessage = () => {
    switch (true) {
      case requireInstall:
        return <div>Please install Metamask</div>;
      case isEmpty && !!account.data:
        return (
          <>
            <div>You don&apos;t own any courses</div>
            <Link href="/marketplace">
              <a className="font-normal hover:underline">
                <i>Purchase Course</i>
              </a>
            </Link>
          </>
        );
      case isEmpty && !account.data:
        return <div>Please connect to Metamask</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <MarketplaceHeader />
      <section className="grid grid-cols-1">
        <div>
          {!!getMessage() && <Message type="warning">{getMessage()}</Message>}
        </div>

        {data?.map((course: IPurchasedCourse) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Message message="My custom message!" />
            <Button
              text="Watch the course"
              onHandleClick={() => router.push(`/courses/${course.slug}`)}
            />
          </OwnedCourseCard>
        ))}
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
