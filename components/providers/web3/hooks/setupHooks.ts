import { ISetupHooks } from "utils/types";
import createUseAccount from "./useAccount";
import createUseNetwork from "./useNetwork";
import createOwnedCoursesHook from "./useOwnedCourses";
import createOwnedCourseHook from "./useOwnedCourse";
import createManagedCoursesHook from "./useManagedCourses";

const setupHooks = ({ web3, contract }: ISetupHooks) => ({
  useAccount: createUseAccount(web3),
  useNetwork: createUseNetwork(web3),
  useOwnedCourses: createOwnedCoursesHook(web3, contract),
  useOwnedCourse: createOwnedCourseHook(web3, contract),
  useManagedCourses: createManagedCoursesHook(web3, contract),
});

export default setupHooks;
