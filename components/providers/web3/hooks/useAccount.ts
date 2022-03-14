/* eslint-disable comma-dangle */
import { useEffect } from "react";
import Web3 from "web3";
import useSWR from "swr";

interface IIndexable {
  [key: string]: boolean;
}

const adminAddresses: IIndexable = {
  // "0xEE2A5C6C99EDBc87beac43cAD44879Fcc48Bd56b": true,
  "0x37c5dc836f8c259b3f231bfa21688359f2d9e32fe3d2dd562a881255d297264f": true,
};

const handler = (web3: Web3 | null) => () => {
  const { data, error, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3?.eth.getAccounts();
      return accounts ? accounts[0] : null;
    }
  );

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        mutate(accounts[0] ?? null);
      });
    }
  }, []);

  return {
    account: {
      data,
      hasInitialResponse: data || error,
      // @ts-expect-error
      isAdmin: (data && adminAddresses[web3?.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest,
    },
  };
};

export default handler;
