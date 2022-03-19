import { FC } from "react";

import { Breadcrumbs } from "components/ui/common";
import { EthRates, WalletBar } from "components/ui/web3";

const LINKS = [
  {
    href: "/marketplace",
    label: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    label: "My Courses",
  },
  {
    href: "/marketplace/courses/manage",
    label: "Manage Courses",
  },
];

const Header: FC = () => (
  <>
    <WalletBar />
    <EthRates />
    <Breadcrumbs items={LINKS} />
  </>
);

export default Header;
