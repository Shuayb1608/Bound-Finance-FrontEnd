import React from "react";

export default function MintContent() {
  return (
    <div className="mt-2 max-w-[600px] mx-auto w-full">
      <p className="text-32 font-mont font-bold text-center text-gradient">
        Mint BCK
      </p>
      <p className="mt-4 text-16 font-mont text-white-100 text-justify ">
        1. To start, you need to open a vault, also known as a 'Cup', where you can place your collateral.
        This allows you to draw and repay the BCK stablecoin debt you accrue.
        Initiate this process by clicking the 'Open' button.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
        2. Afterwards, you can secure some BCKETH collateral within your BCKETH vault.
        Simply input your ID, along with the desired amount of ETH (in Ether units) you wish to contribute.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
        3. You are now able to draw/create BCK stablecoins and repay your BCK. Bear in mind that it's crucial to maintain a sufficient
        Collateralized Debt Position (CDP) ratio. The current ratio stands at 200%, but we recommend exceeding this threshold to avoid potential liquidation risks.
      </p>
      <br />
      <p className="text-16 font-mont text-justify">
        To verify the safety of your CDP from liquidation, use the 'Check Safety' function along with your Cup ID.
        <br />
        A response of 'true' means you are safe from liquidation, while 'false' indicates a risk of liquidation.
      </p>
      <br />
    </div>
  );
}
