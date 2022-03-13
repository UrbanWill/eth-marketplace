import { useHooks } from "components/providers/web3";

import { IHooks } from "utils/types";

const useAccount = () => useHooks((hooks: IHooks) => hooks.useAccount)();

export default useAccount;
