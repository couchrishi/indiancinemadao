import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance contract
const voteModule = await sdk.getVoteModule(
  "0xe1c1e8bc1B20AeAf8702C6f87D77422bed61C27f"
);

// This is our ERC-20 token contract
const tokenModule = await sdk.getTokenModule(
  "0xA21123e4a201D1227E46536F4A1CA63D89fdd6AA"
);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (err) {
    console.error(
      "failed to grant vote module permsissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    // Transfer 90% of the supply to our voting contract
    await tokenModule.transfer(voteModule.address, percent90);
    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
