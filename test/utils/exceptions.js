/* eslint-disable no-throw-literal */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
const PREFIX = "Returned error: VM Exception while processing transaction: ";

async function tryCatch(promise, message) {
  try {
    await promise;
    throw null;
  } catch (error) {
    assert(error, "Expected an error but did not get one");
    assert(
      error.message.startsWith(PREFIX + message),
      `Expected an error starting with '${PREFIX}${message}' but got '${error.message}' instead`
    );
  }
}

module.exports = {
  async catchRevert(promise) {
    await tryCatch(promise, "revert");
  },
  async catchOutOfGas(promise) {
    await tryCatch(promise, "out of gas");
  },
  async catchInvalidJump(promise) {
    await tryCatch(promise, "invalid JUMP");
  },
  async catchInvalidOpcode(promise) {
    await tryCatch(promise, "invalid opcode");
  },
  async catchStackOverflow(promise) {
    await tryCatch(promise, "stack overflow");
  },
  async catchStackUnderflow(promise) {
    await tryCatch(promise, "stack underflow");
  },
  async catchStaticStateChange(promise) {
    await tryCatch(promise, "static state change");
  },
};
