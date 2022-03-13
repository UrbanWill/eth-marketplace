import Web3 from "web3";
import useAccount from "./useAccount";

const DEFAULT_HOOKS = {
  useAccount: () => ({ account: null }),
};
const setupHooks = (web3: Web3 | null) => {
  if (!web3) {
    return DEFAULT_HOOKS;
  }

  return {
    useAccount: useAccount(web3),
  };
};

export default setupHooks;
