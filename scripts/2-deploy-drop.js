import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xa0b2be228328d9394411232e885D24C2b9272250");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // The collection's name
      name: "IndianCinemaDAO Membership",
      // A description for the collection.
      description: "India's first decentralized movie studio",
      // The image for the collectiion that will show up on OpenSea.
      image: readFileSync("scripts/assets/indiancinema.png"),
      // We need to pass in the address of the person who will be receiving
      // the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address
    );

    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata()
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})();
