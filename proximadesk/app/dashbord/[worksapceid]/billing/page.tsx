import { getBillingInfo } from "@/actions/workspace";
import React from "react";

// type Props = {
//     wokspaceId: string
// };

const BillingPage = async () => {
  const payment = await getBillingInfo();

  return (
    <div className="bg-[#1D1D1D] flex flex-col gap-y-8 p-5 rounded-xl">
      <div>
        <h2 className="text-2xl text-white">Current Plan</h2>
        <p className="text-[#9D9D9D]">Your Payment History</p>
      </div>
      <div>
        <h2 className="text-2xl text-white">
          {payment?.data?.subscription?.plan === "PRO" ? "99" : "0"}/Month
        </h2>
        <p className="text-[#9D9D9D]">{payment?.data?.subscription?.plan}</p>
      </div>
    </div>
  );
};

export default BillingPage;
