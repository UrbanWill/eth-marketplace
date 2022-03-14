import { useHooks } from "components/providers/web3";

import { IHooks } from "utils/types";

const useNetwork = () => useHooks((hooks: IHooks) => hooks.useNetwork)();

export default useNetwork;
