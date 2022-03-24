/* eslint-disable no-await-in-loop */
/* eslint-disable no-confusing-arrow */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable indent */

import normalizeOwnedCourse from "utils/normalize";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import useSWR from "swr";

const handler =
  (web3: Web3 | null, contract: Contract | null) =>
  (account: string | null) => {
    const swrRes = useSWR(
      () =>
        web3 && contract && account ? `web3/managedCourses/${account}` : null,
      async () => {
        const courses = [];
        const courseCount = await contract?.methods.getCourseCount().call();

        for (let i = Number(courseCount) - 1; i >= 0; i -= 1) {
          const courseHash = await contract?.methods
            .getCourseHashAtIndex(i)
            .call();
          const course = await contract?.methods
            .getCourseByHash(courseHash)
            .call();

          if (course) {
            const normalized = normalizeOwnedCourse(
              { hash: courseHash },
              course
            );
            courses.push(normalized);
          }
        }
        return courses;
      }
    );

    return swrRes;
  };

export default handler;
