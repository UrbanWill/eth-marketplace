import { useHooks } from "components/providers/web3";

import { IHooks } from "utils/types";

const useAccount = () => useHooks((hooks: IHooks) => hooks.useAccount)();
const useNetwork = () => useHooks((hooks: IHooks) => hooks.useNetwork)();

export { useAccount, useNetwork };
