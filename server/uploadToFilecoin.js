import { Synapse, RPC_URLS } from "@filoz/synapse-sdk";
import { ethers } from "ethers";

export async function uploadBufferToFilecoin(buffer) {
  const synapse = await Synapse.create({
    privateKey: process.env.PRIVATE_KEY,
    rpcURL: RPC_URLS.calibration.http,
  });

  // Deposit + approve
  const amount = ethers.parseUnits("1.0", 18);
  const tx = await synapse.payments.depositWithPermitAndApproveOperator(
    amount,
    synapse.getWarmStorageAddress(),
    ethers.MaxUint256,
    ethers.MaxUint256,
    synapse.TIME_CONSTANTS.EPOCHS_PER_MONTH
  );
  await tx.wait();

  // Upload buffer
  const { pieceCid, size } = await synapse.storage.upload(buffer);
  return { pieceCid, size };
}
