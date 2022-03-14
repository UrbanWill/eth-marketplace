import Web3 from "web3";
import createUseAccount from "./useAccount";
import createUseNetwork from "./useNetwork";

const setupHooks = (web3: Web3 | null) => ({
  useAccount: createUseAccount(web3),
  useNetwork: createUseNetwork(web3),
});

export default setupHooks;
