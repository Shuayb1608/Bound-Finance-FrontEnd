import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "../styles/MakerDao.css";
import { ListCupsFunction } from "./Functions";
import MintTabs from "./MintTabs";
import MintContent from "./MintContent";
import { useAccount, useChainId } from "wagmi";
import {
  IsMaxDebtFunction,
  WithdrawDebtView,
  WithdrawInterestView,
  IsInkFunction,
  isCupMine,
  decimalToHexWithPadding
} from './Functionview.js';

export const MakerDao = () => {
  const [cupList, setCupList] = useState("");
  const { address } = useAccount();
  const id = useChainId();
  const [activeChain, setActiveChain] = useState();
  const [maxBCK, setMaxBCK] = useState(0);
  const [debtInVault, setDebtInVault] = useState(0);
  const [collateralAmount, setCollateralAmount] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [cupID, setCupID] = useState('');


  const getChainDetails = (chain) => {
    if (chain === 11155111) {
      return "Sapolia";
    }
    if (chain === 5) {
      return "Goerli";
    }
    if (chain === 80001) {
      return "Polygon";
    }
    if (chain === 1) {
      return "Mainnet";
    }
  }
  useEffect(() => {
    const chainDetails = getChainDetails(id);
    setActiveChain(chainDetails);
  }, [id, address]);

  const handleCupCheck = async () => {
    let inputCupIdValue = document.getElementById("cupIDVault").value;

    // Check for valid cupID input.
    if (!inputCupIdValue || inputCupIdValue <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid input',
        text: 'Please enter a valid Cup ID.',
      });
      return;
    }

    // Convert to hex with padding.
    const hexCupId = decimalToHexWithPadding(inputCupIdValue);
    
    const owner = await isCupMine(hexCupId);
    if (owner !== address) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'This is not your cup. Please enter a valid cup which is yours.',
      });
      return;
    }

    setCupID(hexCupId);
    
    // Assuming the following methods need cupID as a parameter.
    const maxDebtData = await IsMaxDebtFunction(hexCupId);
    const debtData = await WithdrawDebtView(hexCupId);
    const collateralData = await IsInkFunction(hexCupId);
    const interestData = await WithdrawInterestView(hexCupId);

    if (maxDebtData.maxDebt) setMaxBCK((maxDebtData.maxDebt));
    if (debtData.debt) setDebtInVault(debtData.debt) ;
    if (collateralData.collateralAmount) { setCollateralAmount(collateralData.collateralAmount); };
    if (interestData.interestEarned) { const formattedInterest = parseFloat(interestData.interestEarned).toFixed(2);
    setInterestEarned(formattedInterest);
  }
}


  return (
    <>
      <div className="w-full max-w-[1449px] mx-auto px-6">
        <div className="w-fit mx-auto flex flex-col items-center justify-center gap-6 mt-10">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <p className="text-36 text-gradient font-bold font-mont">
              General Info
            </p>
            <p className="text-16 font-mont text-white-100">Network : {activeChain ? activeChain : 'Connect Wallet'}</p>
          </div>
          <p className="font-mont text-18 break-normal text-white-100 ">
            Address : <span className="break-all">{address ? address : 'Connect Wallet'}</span>
          </p>
        </div>
        <div className="mt-10 gap-8 flex flex-col justify-between lg:flex-row sm:mt-40 ">
          <MintContent />
          <div className="mt-8 md:mt-0 w-full max-w-[630px]">
            <MintTabs />
            <div className="card-background my-10">
              <div className=" w-full gap-2 shadow-cyan-200 shadow-lg">
                <div className="navbar-theme" style={{ borderRadius: 1 }}>
                  <p className="capitalize text-20 font-bold font-mont text-gradient p-3">Vault Information:</p>
                </div>
                <div className="p-3">
                  <input
                    type="number"
                    id="cupIDVault"
                    placeholder='cup ID'
                    className="rounded-md text-16 w-full bg-transparent focus:ring-2 outline-none border py-2 px-3"
                  />
                  <br />
                  <button onClick={handleCupCheck} className="BoxGradient-buttons w-full drop-shadow-xl mt-2 hover:drop-shadow-sm font-bold">Check</button>
                </div>
              </div>
            </div>
            <div className="text-36 grid gap-3 sm:grid-cols-2">
                <div className="cards_box text-white text-center w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 py-6">
                  <p className="text-gradient text-20 font-bold font-mont">Maximum BCK</p>
                  <p className="text-skyblue font-bold font-Helvetica text-2xl">{maxBCK ? `$${maxBCK} BCK` : 'No collateral in vault'}</p>
                </div>

                <div className="cards_box text-white text-center w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 py-6">
                  <p className="text-gradient text-20 font-bold font-mont">BCK Drawn From Vault:</p>
                  <p className="text-skyblue font-bold font-Helvetica text-2xl">{debtInVault ? `$${debtInVault} BCK` : 'No debt'}</p>
                </div>

                <div className="cards_box text-white text-center w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 py-6">
                  <p className="text-gradient text-20 font-bold font-mont">Collateral Amount:</p>
                  <p className="text-skyblue font-bold font-Helvetica text-2xl">{collateralAmount ? `${collateralAmount} BCKETH` : 'No collateral'}</p>
                </div>

                <div className="cards_box text-white text-center w-full shadow-cyan-200 shadow-lg rounded-[6px] text-16 py-6">
                  <p className="text-gradient text-20 font-bold font-mont">Interest Amount Earned:</p>
                  <p className="text-skyblue font-bold font-Helvetica text-2xl">{interestEarned ? `${interestEarned} ETH` : 'No interest earned'}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
);
};
