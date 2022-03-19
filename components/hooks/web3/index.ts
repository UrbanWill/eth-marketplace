import { useHooks } from "components/providers/web3";

import { IHooks } from "utils/types";

const useAccount = () => useHooks((hooks: IHooks) => hooks.useAccount)();
const useNetwork = () => useHooks((hooks: IHooks) => hooks.useNetwork)();

const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return {
    account,
    network,
    canPurchaseCourse: !!(account.data && network.isSupported),
  };
};

export { useAccount, useNetwork, useWalletInfo };
