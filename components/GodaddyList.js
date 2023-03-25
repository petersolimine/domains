import React, { useState } from "react";

const GodaddyListItem = ({ domain, price }) => {
  const [showPurchaseOptions, setShowPurchaseOptions] = useState(false);

  const togglePurchaseOptions = () => {
    setShowPurchaseOptions(!showPurchaseOptions);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 mx-auto my-2 sm:w-full max-w-screen-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100"
      onClick={togglePurchaseOptions}
    >
      <div className="flex items-center justify-between ">
        <h2 className="text-xl font-semibold text-black">{domain}</h2>
        <div className="flex items-center">
          <span className="text-xl font-extrabold text-gray-800 order-last">
            ${price / 1000000}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GodaddyListItem;
