/* eslint-disable comma-dangle */
import Web3 from "web3";

const FALLBACK_NETWORK = 1;
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

const loadContract = async (name: string, web3: Web3) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();
  let contract = null;

  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID ?? FALLBACK_NETWORK].address
    );
  } catch {
    console.log(`Contract ${name} cannot be loaded`);
  }

  return contract;
};

export default loadContract;
