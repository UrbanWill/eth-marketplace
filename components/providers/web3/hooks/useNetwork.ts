/* eslint-disable comma-dangle */
import { useEffect } from "react";
import Web3 from "web3";
import useSWR from "swr";

interface IIndexable {
  [key: string]: string;
}

const NETWORKS: IIndexable = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

// @ts-expect-error
const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

const handler = (web3: Web3 | null) => () => {
  const { data, error, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId = await web3?.eth.getChainId();
      if (chainId) {
        return NETWORKS[chainId];
      }
      return NETWORKS[1337];
    }
  );

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId: number) => {
        mutate(NETWORKS[parseInt(String(chainId), 16)]);
      });
    }
  }, [web3]);

  return {
    network: {
      mutate,
      data,
      hasInitialResponse: data || error,
      target: targetNetwork,
      isSupported: data === targetNetwork,
      ...rest,
    },
  };
};

export default handler;
