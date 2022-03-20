import { FC } from "react";

import { MarketplaceHeader } from "components/ui/marketplace";
import { OwnedCourseCard } from "components/ui/course";

const OwnedCourses: FC = () => (
  <>
    <MarketplaceHeader />
    <section className="grid grid-cols-1">
      <OwnedCourseCard />
    </section>
  </>
);

export default OwnedCourses;
