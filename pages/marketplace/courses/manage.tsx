import { FC } from "react";

import { OwnedCourseCard } from "components/ui/course";
import { MarketplaceHeader } from "components/ui/marketplace";

const ManageCourses: FC = () => (
  <>
    <MarketplaceHeader />
    <section className="grid grid-cols-1">
      <OwnedCourseCard />
    </section>
  </>
);

export default ManageCourses;
