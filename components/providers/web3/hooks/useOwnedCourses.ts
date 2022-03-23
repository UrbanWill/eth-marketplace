/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import useSWR from "swr";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Course } from "utils/types";
import normalizeOwnedCourse from "utils/normalize";

const NO_OWNER = "0x0000000000000000000000000000000000000000";

const handler =
  (web3: Web3 | null, contract: Contract | null) =>
  (courses: Course[], account: string | null) => {
    const swrRes = useSWR(
      () => (web3 && contract && account ? "web3/ownedCourses" : null),
      async () => {
        const formattedItems = await Promise.all(
          courses.map(async (course) => {
            const hexCourseId = web3?.utils.utf8ToHex(course.id);
            let courseHash;

            if (hexCourseId && account) {
              courseHash = web3?.utils.soliditySha3(
                { type: "bytes16", value: hexCourseId },
                { type: "address", value: account }
              );
            }

            const ownedCourse = await contract?.methods
              .getCourseByHash(courseHash)
              .call();

            if (ownedCourse.owner !== NO_OWNER) {
              return normalizeOwnedCourse(course, ownedCourse);
            }

            return [];
          })
        );

        return formattedItems;
      }
    );

    return swrRes;
  };

export default handler;
