/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
import { useEffect } from "react";
import { useWeb3 } from "components/providers";
import { useRouter } from "next/router";

import { useHooks } from "components/providers/web3";

import { IHooks, Course } from "utils/types";

const useAccount = () => useHooks((hooks: IHooks) => hooks.useAccount)();
const useNetwork = () => useHooks((hooks: IHooks) => hooks.useNetwork)();

const useAdmin = (redirectTo: string) => {
  const { account } = useAccount();
  const { requireInstall } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (
      requireInstall ||
      (account.hasInitialResponse && !account.isAdmin) ||
      account.isEmpty
    ) {
      router.push(redirectTo);
    }
  }, [account]);

  return { account };
};

const useOwnedCourses = (courses: Course[], account: string | null) => {
  const swrRes = useHooks((hooks: IHooks) => hooks.useOwnedCourses)(
    courses,
    account
  );

  return {
    ownedCourses: swrRes,
  };
};

const useOwnedCourse = (course: Course, account: string | null) => {
  const swrRes = useHooks((hooks: IHooks) => hooks.useOwnedCourse)(
    course,
    account
  );

  return {
    ownedCourse: swrRes,
  };
};

const useManagedCourses = (account: string | null) => {
  const swrRes = useHooks((hooks: IHooks) => hooks.useManagedCourses)(account);

  return {
    managedCourses: swrRes,
  };
};

const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return {
    account,
    network,
    canPurchaseCourse: !!(account.data && network.isSupported),
  };
};

export {
  useAccount,
  useNetwork,
  useWalletInfo,
  useOwnedCourses,
  useOwnedCourse,
  useManagedCourses,
  useAdmin,
};
