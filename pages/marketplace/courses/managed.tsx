/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import { FC, useState } from "react";
import { useAccount, useManagedCourses } from "components/hooks/web3";

import {
  ManagedCourseCard,
  CourseFilter,
  VerificationInput,
} from "components/ui/course";
import { MarketplaceHeader } from "components/ui/marketplace";
import { useWeb3 } from "components/providers";
import { Message } from "components/ui/common";
import { IPurchasedCourse } from "utils/types";

interface IIndexable {
  [key: string]: boolean;
}

const ManageCourses: FC = () => {
  const [proofedOwnership, setProofedOwnership] = useState<IIndexable>({});

  const { web3 } = useWeb3();
  const { account } = useAccount();
  const { managedCourses } = useManagedCourses(account);

  /** This function would make a call to a third party service to
   * validate and give the user access by email
   * */
  const verifyCourse = async (email: string, hash: string, proof: string) => {
    const emailHash = web3?.utils.sha3(email);
    let proofToCheck;
    if (emailHash) {
      proofToCheck = await web3?.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: hash }
      );
    }

    if (proofToCheck === proof) {
      return setProofedOwnership({
        [hash]: true,
      });
    }
    return setProofedOwnership({
      [hash]: false,
    });
  };

  return (
    <>
      <MarketplaceHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course: IPurchasedCourse) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <VerificationInput
              onVerify={(email) =>
                verifyCourse(email, course.hash, course.proof)
              }
            />
            {proofedOwnership[course.hash] && (
              <div className="mt-2">
                <Message>Verified!</Message>
              </div>
            )}
            {proofedOwnership[course.hash] === false && (
              <div className="mt-2">
                <Message type="danger">Wrong Proof!</Message>
              </div>
            )}
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
};

export default ManageCourses;
