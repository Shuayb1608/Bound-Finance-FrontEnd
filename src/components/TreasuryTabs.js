import React, { useState, useEffect } from "react";
import { getLatestProposalId } from "./Functionview";  // import your function
import { Tab, Tabs } from "./Tabs";
import TreasuryApproveChange from "./TreasuryApproveChange";
import TreasuryDelegate from "./TreasuryDelegate";
import Reserve from "./TreasuryDAOInfo";
import TreasuryProposal from "./TreasuryProposal";

export default function TreasuryTabs() {
  const [latestProposalId, setLatestProposalId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchLatestProposalId() {
      try {
        const id = await getLatestProposalId();
        setLatestProposalId(id);
      } catch (error) {
        console.error("Error fetching latest proposal ID:", error);
        setErrorMessage(error.message);
      }
    }

    fetchLatestProposalId();

    const interval = setInterval(fetchLatestProposalId, 7200000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1449px] p-6 mt-[50px] mx-auto gap-5 grid grid-cols-1 lg:grid-cols-2">
      <div>
        <div className="cards_box text-white shadow-cyan-200 shadow-lg rounded-[6px] text-16 h-[150px] flex items-center justify-center">
          <div className="text-center">
            <p>Latest Proposal ID that has been created:</p>

            <p className="text-skyblue font-bold font-Helvetica text-2xl">
              {latestProposalId !== null ? `${latestProposalId} ID` 
              : errorMessage ? errorMessage
              : "Loading..."}
           </p>

          </div>
        </div>
        <div className="mt-8">
          <Reserve />
        </div>
      </div>
      <div className="w-full max-w-[567px] mx-auto">
        <Tabs>
          <Tab label="Approve Changes">
            <TreasuryApproveChange />
          </Tab>
          <Tab label="Delegate">
            <TreasuryDelegate />
          </Tab>
          <Tab label="Check Proposal ID Info">
            <TreasuryProposal />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
