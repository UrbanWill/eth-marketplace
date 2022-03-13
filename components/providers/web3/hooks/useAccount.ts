import { useState, useEffect } from "react";
import Web3 from "web3";

const handler = (web3: Web3 | null) => () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const getAccount = async () => {
      if (!web3) {
        return;
      }
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    getAccount();
  }, [web3]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] ?? null);
      });
    }
  }, []);

  return { account };
};

export default handler;
