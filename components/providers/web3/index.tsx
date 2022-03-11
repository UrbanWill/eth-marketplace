import { createContext, FC, ReactNode, useContext } from "react";
import { IWeb3Context } from "utils/types";

const Web3Context = createContext<IWeb3Context | null>(null);

const Web3Provider: FC<ReactNode> = ({ children }) => (
  <Web3Context.Provider value={{ test: "Hello" }}>
    {children}
  </Web3Context.Provider>
);

export const useWeb3 = () => useContext(Web3Context);

export default Web3Provider;
