/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { IWeb3Context, IWeb3ApiState } from "utils/types";
import loadContract from "utils/loadContract";
import setupHooks from "./hooks/setupHooks";

const initialContext = {
  provider: null,
  web3: null,
  contract: null,
  isLoading: true,
  connect: () => {},
  requireInstall: false,
  hooks: setupHooks({ web3: null, contract: null }),
};

// TODO: Drop Web3 if favour of Ethers, and/or drop Web3 and detectEthereumProvider
// in favor of web3-react

const Web3Context = createContext<IWeb3Context>(initialContext);

const Web3Provider: FC<ReactNode> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<IWeb3ApiState>(initialContext);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        // @ts-ignore
        const web3 = new Web3(provider);
        const contract = await loadContract("CourseMarketplace", web3);
        setWeb3Api({
          // @ts-ignore
          provider,
          web3,
          hooks: setupHooks({ web3, contract }),
          contract,
          isLoading: false,
        });
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please, install Metamask.");
      }
    };

    loadProvider();
  }, []);

  // eslint-disable-next-line no-underscore-dangle
  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading, contract } = web3Api;

    const handleConnect = async () => {
      if (provider) {
        // @ts-expect-error
        return provider?.request({
          method: "eth_requestAccounts",
        });
      }
      return console.error(
        new Error(
          "Cannot connect to Metamask, try to reload your browser please."
        )
      );
    };

    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: handleConnect,
      // TODO: Refactor this, hooks is possibly being called multiple times
      hooks: setupHooks({ web3, contract }),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);

export default Web3Provider;

export const useHooks = (callback: any) => {
  const { hooks } = useWeb3();
  return callback(hooks);
};
