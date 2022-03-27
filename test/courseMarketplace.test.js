/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */

const { catchRevert } = require("./utils/exceptions");

const CourseMarketplace = artifacts.require("CourseMarketplace");

contract("CourseMarketplace", ([contractOwner, buyer, ...accounts]) => {
  let contract = null;
  let courseHash = null;

  const courseId = "0x00000000000000000000000000003130";
  const proof =
    "0x0000000000000000000000000000313000000000000000000000000000003130";
  const value = "900000000";

  before(async () => {
    contract = await CourseMarketplace.deployed();
  });

  describe("Purchase a new course", () => {
    before(async () => {
      await contract.purchaseCourse(courseId, proof, {
        from: buyer,
        value,
      });
    });

    it("should NOT allow to repurchase already owned course", async () => {
      await catchRevert(
        contract.purchaseCourse(courseId, proof, {
          from: buyer,
          value,
        })
      );
    });

    it("Can get the purchased course hash by index", async () => {
      const index = 0;
      const expectedHash = web3.utils.soliditySha3(
        { type: "bytes16", value: courseId },
        { type: "address", value: buyer }
      );
      courseHash = await contract.getCourseHashAtIndex(index);

      assert.equal(
        courseHash,
        expectedHash,
        "Course hash is not matching the hash of purchased course!"
      );
    });

    it("Should match the data of the course purchased by buyer", async () => {
      const expectedIndex = 0;
      const expectedState = 0;
      const course = await contract.getCourseByHash(courseHash);

      assert.equal(course.id, expectedIndex, "Course index should be 0!");
      assert.equal(course.price, value, `Course price should be ${value}!`);
      assert.equal(course.proof, proof, `Course proof should be ${proof}!`);
      assert.equal(course.owner, buyer, `Course buyer should be ${buyer}!`);
      assert.equal(
        course.state,
        expectedState,
        `Course state should be ${expectedState}!`
      );
    });
  });

  describe("Activate the purchased course", () => {
    it("should NOT be able to activate course by NOT contract owner", async () => {
      await catchRevert(contract.activateCourse(courseHash, { from: buyer }));
    });

    it("Should have 'activated' state", async () => {
      await await contract.activateCourse(courseHash, { from: contractOwner });

      const expectedState = 1;
      const course = await contract.getCourseByHash(courseHash);

      assert.equal(
        course.state,
        expectedState,
        `Course state should be ${expectedState}!`
      );
    });

    it("Should NOT be activate a course with 'activated state", async () => {
      await catchRevert(
        contract.activateCourse(courseHash, { from: contractOwner })
      );
    });

    it("Should NOT be activate a course that has NOT been created", async () => {
      const inexistentCourseHash =
        "0xb54883cc4361bdac7dfb843779403689bf93dd498b7657d706807751a643d30c";

      await catchRevert(
        contract.activateCourse(inexistentCourseHash, { from: contractOwner })
      );
    });
  });

  describe("Transfer ownership", () => {
    let currentOwner = null;

    before(async () => {
      currentOwner = await contract.getContractOwner();
    });

    it("getContractOwner should return deployer address", async () => {
      assert.equal(
        contractOwner,
        currentOwner,
        "Contract owner is not matching the one from getContractOwner function"
      );
    });

    it("should NOT transfer ownership when contract owner is not sending TX", async () => {
      await catchRevert(
        contract.transferOwnership(accounts[3], { from: accounts[4] })
      );
    });

    it("should transfer owership to 3rd address from 'accounts'", async () => {
      await contract.transferOwnership(accounts[2], { from: currentOwner });
      const owner = await contract.getContractOwner();
      assert.equal(
        owner,
        accounts[2],
        "Contract owner is not the second account"
      );
    });

    it("should transfer owership back to initial contract owner'", async () => {
      await contract.transferOwnership(contractOwner, { from: accounts[2] });
      const owner = await contract.getContractOwner();
      assert.equal(owner, contractOwner, "Contract owner is not set!");
    });
  });
});
