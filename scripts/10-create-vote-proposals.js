import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract
const voteModule = await sdk.getVoteModule(
  "0xe1c1e8bc1B20AeAf8702C6f87D77422bed61C27f"
);

// Our ERC-20 token contract
const tokenModule = await sdk.getTokenModule(
  "0xA21123e4a201D1227E46536F4A1CA63D89fdd6AA"
);

(async () => {
  try {
    const amount = 420_000;
    // Create proposal to mint 420,000 new token to the treasury.
    await voteModule.propose(
      "Should the DAO mint an additional " +
        amount +
        " tokens into the treasury",
      [
        {
          // Our native token is ETH. nativeTokenValue is the amount of ETH we want
          // to send in this proposal. In this case, we're sending 0 ETH.
          // We're just minting new tokens to the treasury. So, set to 0.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a mint! And, we're minting to the voteModule, which is
            // acting as our treasury
            "mint",
            [voteModule.address, ethers.utils.parseUnits(amount.toString(), 18)]
          ),
          // Our token module that actually executes the mint.
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (err) {
    console.error("Failed to create proposal to mint tokens", err);
  }

  try {
    const amount = 6_900;
    // Create proposal to transfer ourselves 6,900 token for being awesome.
    await voteModule.propose(
      "Should the DAO transfer " +
        amount +
        " tokens from the treasury to " +
        process.env.WALLET_ADDRESS +
        " for being awesome?",
      [
        {
          // Again, we're sending ourselves 0 ETH. Just sending our own token.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a transfer from the treasury to our wallet.
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );
    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (err) {
    console.error(
      "Failed to create proposoal to reward ourselves from the treasury",
      err
    );
  }
})();
