/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable no-confusing-arrow */
import useSWR from "swr";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Course } from "utils/types";
import normalizeOwnedCourse from "utils/normalize";

const handler =
  (web3: Web3 | null, contract: Contract | null) =>
  (course: Course, account: string | null) => {
    const { data, error, ...rest } = useSWR(
      () =>
        web3 && contract && account
          ? `web3/ownedCourse/${account}/${course.id}`
          : null,
      async () => {
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
        if (
          ownedCourse.owner === "0x0000000000000000000000000000000000000000"
        ) {
          return null;
        }

        return normalizeOwnedCourse(course, ownedCourse);
      }
    );

    return {
      data,
      hasInitialResponse: !!(data || error),
      ...rest,
    };
  };

export default handler;
