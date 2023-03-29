import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const GodaddyListItem = ({ domain, price }) => {
  const [showPurchaseOptions, setShowPurchaseOptions] = useState(false);
  const [purchaseOptions, setPurchaseOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePurchaseOptions = async () => {
    if (!showPurchaseOptions) {
      setIsLoading(true);
      // get evereything before the . in the domain
      const base = domain.split(".")[0];
      const response = await fetch("/api/check_tlds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domains: [
            base + ".com",
            base + ".net",
            base + ".io",
            base + ".app",
            base + ".ai",
            base + ".org",
            base + ".us",
          ],
        }),
      });
      const data = await response.json();
      const formattedOptions = data.available.map((obj) => {
        const key = Object.keys(obj)[0];
        const value = obj[key];
        return {
          tld: key,
          price: value / 1000000,
          url: `https://click.godaddy.com/affiliate?isc=cjc50hst&url=https://www.godaddy.com/domainsearch/find?domainToCheck=${key}`,
        };
      });

      setPurchaseOptions(formattedOptions);
      setIsLoading(false);
    }
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
          {isLoading ? (
            <span className="text-xl font-extrabold text-gray-800 order-last">
              Loading...
            </span>
          ) : (
            <span className="text-xl font-extrabold text-gray-800 order-last">
              ${price / 1000000}
            </span>
          )}
        </div>
      </div>
      {showPurchaseOptions && (
        <div className="mt-6 bg-gray-50 shadow-inner rounded-lg">
          <ul className="divide-y divide-gray-300">
            {purchaseOptions
              .sort((a, b) => a.price - b.price)
              .map((option, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gradient-to-r from-cyan-50 to-blue-50 hover:rounded-md transition-colors duration-400"
                  >
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center w-full"
                    >
                      <button className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-5 py-2 rounded-md hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200 mr-4">
                        Make it Yours
                      </button>
                      <span className="font-semibold text-gray-600 flex-grow">
                        ${option.price}
                      </span>
                      <span className="font-semibold text-gray-600">
                        {option.tld}
                      </span>
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

export default GodaddyListItem;
