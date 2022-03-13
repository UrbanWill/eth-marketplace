import Web3 from "web3";
import createUseAccount from "./useAccount";

const setupHooks = (web3: Web3 | null) => ({
  useAccount: createUseAccount(web3),
});

export default setupHooks;
