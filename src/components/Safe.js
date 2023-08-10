import React from "react";
import { IsSafeFunction } from "./Functions";

export default function CheckCupSafety() {
  return (
    <div className="p-3 card-backgorund rounded-lg">
      <p className="text-24 font-bold text-center ">Check Cup Safety</p>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="checkSafety" className="text-16 font-medium">
          Enter Cup ID:
        </label>
        <input
          type="text"
          className="rounded-md  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
          id="cupIdInputSafety"
          placeholder="Cup ID"
        />
        <button onClick={IsSafeFunction} className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
          Check Safety
        </button>
      </div>
    </div>
  );
}
