import sdk from "./1-initialize-sdk.js";

// Our ERC-20 token contract
const tokenModule = await sdk.getTokenModule(
  "0xA21123e4a201D1227E46536F4A1CA63D89fdd6AA"
);

(async () => {
  try {
    // Log the current roles.
    console.log(
      "👀 Roles that exist right now:",
      await tokenModule.getAllRoleMembers()
    );

    // Revoke all the super powers your wallet had over the ERC-20 contract.
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log(
      "🎉 Roles after revoking ourselves:",
      await tokenModule.getAllRoleMembers()
    );
    console.log(
      "✅ Successfully revoked our superpowers from the ERC-20 contract"
    );
  } catch (error) {
    console.log("Failed to revoke ourselves from the DAO treasury", error);
  }
})();
