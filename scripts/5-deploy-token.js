import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module

const app = sdk.getAppModule("0xa0b2be228328d9394411232e885D24C2b9272250");

(async () => {
  try {
    // Deploy a standard ERC-20 contract
    const tokenModule = await app.deployTokenModule({
      // What's your token's name?
      name: "TENTKOTTA",
      // What's your token's symbol?
      symbol: "seat",
    });
    console.log(
      "✅  Successfully deployed token module, address: ",
      tokenModule.address
    );
  } catch (error) {
    console.error("failed to deply token module", error);
  }
})();
