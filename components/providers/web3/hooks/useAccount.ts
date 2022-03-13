import Web3 from "web3";

const useAccount = (web3: Web3) => () => ({
  account: web3 ? "Test Account" : "null",
});

export default useAccount;
