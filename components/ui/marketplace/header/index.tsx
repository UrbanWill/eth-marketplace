import { FC } from "react";
import { useAccount } from "components/hooks/web3";

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
    href: "/marketplace/courses/managed",
    label: "Manage Courses",
    requireAdmin: true,
  },
];

const Header: FC = () => {
  const { account } = useAccount();
  return (
    <>
      <WalletBar />
      <EthRates />
      <Breadcrumbs items={LINKS} isAdmin={account.isAdmin} />
    </>
  );
};

export default Header;
