import { ParsedUrlQuery } from "querystring";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
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
  contract: Contract | null;
  isLoading: boolean;
}

interface IHooks {
  // TODO: Improve this typing with SWRResponse
  useAccount: () => any;
  useNetwork: () => any;
  useOwnedCourses: any;
  useOwnedCourse: any;
  useManagedCourses: any;
}

interface IWeb3Context extends IWeb3ApiState {
  requireInstall: boolean;
  connect: () => void;
  hooks: IHooks | null;
}

interface IOrder {
  price: string;
  email: string;
  confirmationEmail: string;
}

interface ISetupHooks {
  web3: Web3 | null;
  contract: Contract | null;
}

interface IIndexable {
  [key: string]: string | number | string[];
}

interface IPurchasedCourse extends Course, IIndexable {
  hash: string;
  ownedCourseId: string;
  proof: string;
  owner: string;
  state: number;
  price: string;
}

interface IAccount {
  data: string;
  hasInitialResponse: boolean;
  isAdmin: boolean;
  isValidating: false;
}

type MessageVariants = "success" | "warning" | "danger";

type CourseState = "purchased" | "activated" | "deactivated";

export type {
  Course,
  IParams,
  IWeb3Context,
  IWeb3ApiState,
  IHooks,
  IOrder,
  ISetupHooks,
  IPurchasedCourse,
  MessageVariants,
  CourseState,
  IAccount,
};
