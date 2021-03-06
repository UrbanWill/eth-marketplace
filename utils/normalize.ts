/* eslint-disable comma-dangle */
import Web3 from "web3";
import { Course, CourseState } from "utils/types";

interface IIndexable {
  [key: string]: CourseState;
}

export const COURSE_STATES: IIndexable = {
  0: "purchased",
  1: "activated",
  2: "deactivated",
};

interface IOwnedCourse {
  id: string;
  proof: string;
  owner: string;
  state: number;
  price: string;
}

interface ICourseHash {
  hash: string;
}

const normalizeOwnedCourse = (
  course: Course | ICourseHash,
  ownedCourse: IOwnedCourse
) => ({
  ...course,
  ownedCourseId: ownedCourse.id,
  proof: ownedCourse.proof,
  owned: ownedCourse.owner,
  price: Web3.utils.fromWei(ownedCourse.price),
  state: COURSE_STATES[ownedCourse.state],
});

export default normalizeOwnedCourse;
