import React, { useState } from "react";
import Image from "next/image";

const ListItem = ({ domain, price, purchaseOptions }) => {
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
            ${price}
          </span>
        </div>
      </div>
      {showPurchaseOptions && (
        <div className="mt-6 bg-gray-50 shadow-inner rounded-lg">
          <ul className="divide-y divide-gray-300">
            {purchaseOptions
              .sort((a, b) => a.price - b.price)
              .map((option, index) => {
                const url = option.url.replace("{domain}", domain);
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gradient-to-r from-cyan-50 to-blue-50 hover:rounded-md transition-colors duration-400"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center w-full"
                    >
                      <button className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-5 py-2 rounded-md hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200 mr-4">
                        Buy Now
                      </button>
                      <span className="font-semibold text-gray-600 flex-grow">
                        ${option.price}
                      </span>
                      <Image
                        src={option.logo}
                        alt={option.site}
                        className="w-24 h-8"
                      />
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListItem;
