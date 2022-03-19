import { FC } from "react";

import { Breadcrumbs } from "components/ui/common";
import { EthRates, WalletBar } from "components/ui/web3";

const Header: FC = () => (
  <>
    <WalletBar />
    <EthRates />
    <Breadcrumbs />
  </>
);

export default Header;
