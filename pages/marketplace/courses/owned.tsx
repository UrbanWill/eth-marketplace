import { FC } from "react";

import { MarketplaceHeader } from "components/ui/marketplace";
import { OwnedCourseCard } from "components/ui/course";
import { Button, Message } from "components/ui/common";

const OwnedCourses: FC = () => (
  <>
    <MarketplaceHeader />
    <section className="grid grid-cols-1">
      <OwnedCourseCard>
        <Message message="My custom message!" />
        <Button text="Watch the course" />
      </OwnedCourseCard>
    </section>
  </>
);

export default OwnedCourses;
