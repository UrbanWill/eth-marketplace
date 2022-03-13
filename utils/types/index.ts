import { ParsedUrlQuery } from "querystring";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

interface Course {
  id: string;
  type: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  link: string;
  slug: string;
  wsl: string[];
  createdAt: string;
  index: number;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IWeb3ApiState {
  provider: typeof detectEthereumProvider | null;
  web3: null | Web3;
  contract: null;
  isLoading: boolean;
}

interface IHooks {
  // TODO: Improve this typing with SWRResponse
  useAccount: () => any;
}

interface IWeb3Context extends IWeb3ApiState {
  isWeb3Loaded: boolean;
  connect: () => void;
  getHooks: () => IHooks;
}

export type { Course, IParams, IWeb3Context, IWeb3ApiState, IHooks };
