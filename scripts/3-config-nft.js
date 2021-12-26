import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x3f1e9Cdd485191b8658aD311e49f77Bc021f0749"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Thalaivar",
        description: "This NFT will give you access to IndianCinemaDAO!",
        image: readFileSync("scripts/assets/thalaivar.jpeg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
