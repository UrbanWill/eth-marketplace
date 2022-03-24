/* eslint-disable no-confusing-arrow */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import useSWR from "swr";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Course } from "utils/types";
import normalizeOwnedCourse from "utils/normalize";
import createCourseHash from "utils/createCourseHash";

const NO_OWNER = "0x0000000000000000000000000000000000000000";

// TODO: Refactor this to use reducer
const handler =
  (web3: Web3 | null, contract: Contract | null) =>
  (courses: Course[], account: string | null) => {
    const { data, error, ...rest } = useSWR(
      () =>
        web3 && contract && account ? `web3/ownedCourses/${account}` : null,
      async () => {
        const formattedItems = await Promise.all(
          courses.map(async (course) => {
            // @ts-expect-error this fn will not be called if there is no web3
            const courseHash = createCourseHash(web3, course.id, account);

            const ownedCourse = await contract?.methods
              .getCourseByHash(courseHash)
              .call();

            if (ownedCourse.owner !== NO_OWNER) {
              return normalizeOwnedCourse(course, ownedCourse);
            }

            return null;
          })
        );

        return formattedItems.filter((course) => !!course);
      }
    );

    return {
      data,
      isEmpty: !data || data.length === 0,
      hasInitialResponse: !!(data || error),
      ...rest,
    };
  };

export default handler;
