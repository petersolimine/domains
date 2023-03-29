import { Toaster, toast } from "react-hot-toast";
import Head from "next/head";
import Image from "next/image";
import ListItem from "../components/ListItem";
import GodaddyListItem from "../components/GodaddyList";
import React, { useState } from "react";
import { JellyfishSpinner } from "../components/Spinner";
import KeywordInput from "../components/KeywordInput";
import { TLD_PRESETS, CUSTOM_INSTRUCTIONS_PRESETS } from "../lib/Constants";

import godaddy from "../images/godaddy.png";
import namesilo from "../images/namesilo.png";
import namecheap from "../images/namecheap.png";
import Footer from "../components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const [keywordChips, setKeywordChips] = useState<string[]>([]);
  const [similarDomainChips, setSimilarDomainChips] = useState<string[]>([]);
  const [customInstructions, setCustomInstructions] = useState<string[]>([]);
  const [tldChips, setTldChips] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [godaddyDomains, setGodaddyDomains] = useState([
    { domain: "tryitout.ai", price: 49998000000 / 100 },
  ]);

  const domainData = [
    {
      domain: "example.com",
      price: 12.99,
      purchaseOptions: [
        {
          site: "NameSilo",
          price: 12.99,
          logo: namesilo,
          url: "https://www.namesilo.com/domain/search-domains?query={domain}",
        },
        {
          site: "GoDaddy",
          price: 13.99,
          logo: godaddy,
          url: "https://www.godaddy.com/domains/domain-name-search?checkAvail=1&tmskey=&domainToCheck={domain}",
        },
        {
          site: "NameCheap",
          price: 1.99,
          logo: namecheap,
          url: "https://www.namecheap.com/domains/registration/results/?domain=cannibal{domain}",
        },
      ],
    },
    {
      domain: "example.com",
      price: 12.99,
      purchaseOptions: [
        {
          site: "NameSilo",
          price: 12.99,
          logo: namesilo,
          url: "https://www.namesilo.com/domain/search-domains?query={domain}",
        },
        {
          site: "GoDaddy",
          price: 13.99,
          logo: godaddy,
          url: "https://www.godaddy.com/domains/domain-name-search?checkAvail=1&tmskey=&domainToCheck={domain}",
        },
      ],
    },
    {
      domain: "example.com",
      price: 12.99,
      purchaseOptions: [
        {
          site: "NameSilo",
          price: 12.99,
          logo: namesilo,
          url: "https://www.namesilo.com/domain/search-domains?query={domain}",
        },
        {
          site: "GoDaddy",
          price: 13.99,
          logo: godaddy,
          url: "https://www.godaddy.com/domains/domain-name-search?checkAvail=1&tmskey=&domainToCheck={domain}",
        },
      ],
    },
    {
      domain: "example.com",
      price: 12.99,
      purchaseOptions: [
        {
          site: "NameSilo",
          price: 12.99,
          logo: namesilo,
          url: "https://www.namesilo.com/domain/search-domains?query={domain}",
        },
        {
          site: "GoDaddy",
          price: 13.99,
          logo: godaddy,
          url: "https://www.godaddy.com/domains/domain-name-search?checkAvail=1&tmskey=&domainToCheck={domain}",
        },
      ],
    },
  ];

  const generateAnswer = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (prompt.length < 5) {
      toast.error("Your prompt is too short. 😢");
      setLoading(false);
      return;
    }
    let compound_prompt = prompt.trim() + "\n";

    if (
      !(
        keywordChips.length === 0 &&
        similarDomainChips.length === 0 &&
        tldChips.length === 0 &&
        customInstructions.length === 0
      )
    ) {
      compound_prompt += "\nCONSTRAINTS:\n";
    }

    // add advanced settings to the base prompt (i.e. 'compound prompt');
    if (keywordChips.length !== 0) {
      compound_prompt += "\nKeywords to consider: " + keywordChips.join(", ");
    }
    if (similarDomainChips.length !== 0) {
      compound_prompt +=
        "\nGood example(s) to consider: " + similarDomainChips.join(", ");
    }
    if (tldChips.length !== 0) {
      compound_prompt +=
        "Here's a list of Domain endings (aka TLDs) that the user likes: " +
        tldChips.join(", ");
    }
    if (customInstructions.length !== 0) {
      // first, remove every '.' from the custom instructions
      customInstructions.forEach((instruction, index) => {
        customInstructions[index] = instruction.replace(".", "");
      });
      compound_prompt +=
        "\nCustom Instructions (read carefully, these are most important): " +
        customInstructions.join(", ");
    }
    console.log("compound prompt", compound_prompt);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: compound_prompt,
      }),
    });

    if (!response.ok) {
      console.error(response.statusText);
      toast.error(`Something went wrong. 😢 ${response.status}`);
    }

    // Read the response body as text
    const data = await response.text();

    if (!data) {
      setLoading(false);
      return;
    }

    const domains = extractDomains(data);
    console.log("extracted", domains);
    setLoading(false);
    if (domains.length <= 3) {
      toast.error("Something went wrong on our end.. Please retry!");
      return;
    }
    const domains_from_godaddy = await checkGodaddyAvailability(domains);
    setGodaddyDomains(domains_from_godaddy.available);
    setLoading(false);
  };

  function isValidTLD(tld: string) {
    // You can use a list of valid TLDs or a regular expression to verify the TLD
    // Here's a simple regular expression example
    return /^[a-z]{2,}$/.test(tld);
  }

  function extractDomains(input: string) {
    const lines = input.trim().split("\n");
    const domains = [];

    for (const line of lines) {
      const words = line.split(" ");
      const domain = words[words.length - 1].trim().replace(/[,]/g, "");
      const domainParts = domain.split(".");

      if (
        domainParts.length >= 2 &&
        isValidTLD(domainParts[domainParts.length - 1])
      ) {
        const domainName = domainParts.slice(0, -1).join(".");

        // Check for valid domain name characters and length
        if (
          /^([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i.test(domainName) &&
          domainName.length <= 63
        ) {
          domains.push(domain);
        }
      }
    }

    return domains;
  }

  const checkGodaddyAvailability = async (domains: Array<string>) => {
    const response = await fetch("/api/check_godaddy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domains: domains,
      }),
    });

    if (!response.ok) {
      console.error(response.statusText);
      toast.error(`Something went wrong. 😢 ${response.status}`);
    }

    // Read the response body as text
    const data = await response.json();

    if (!data) {
      setLoading(false);
      return;
    }
    return data;
  };
  const checkNameDotcom = async (domains: Array<string>) => {
    const response = await fetch("/api/check_namedotcom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domains: domains,
      }),
    });

    if (!response.ok) {
      console.error(response.statusText);
      toast.error(`Something went wrong. 😢 ${response.status}`);
    }

    // Read the response body as text
    const data = await response.json();

    if (!data) {
      setLoading(false);
      return;
    }
    return data;
  };

  return (
    <>
      <Head>
        <title>Domain Search Tool | DomainGarden</title>
        <meta
          name="description"
          content="Easiest way to find domains that are available"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/search.svg" />
      </Head>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-200 bg-opacity-100 min-h-screen">
        <div className="min-h-screen flex justify-center items-center flex-col">
          <div className="flex flex-row items-center space-x-3">
            <Image src="/search.svg" alt="Search" width={90} height={90} />
            <Image src="/robot.svg" alt="Robot" width={100} height={100} />
          </div>
          <h1 className="text-4xl font-extrabold mt-4">DomainGarden.io </h1>
          <h1 className="text-xl font mb-8 mt-2">
            The easiest way to find available domains
          </h1>
          {/* <div className="flex mt-10 items-center space-x-3"> */}
          <p className="self-start text-xl font-medium mx-auto sm:w-full max-w-screen-lg">
            Describe your product or company{" "}
            <span className="text-slate-400">(two to four sentences).</span>
          </p>
          <div className="flex flex-col md:flex-row items-stretch md:items-center mx-auto my-2 w-full max-w-screen-lg gap-4 sm:p-0">
            <div className="relative w-full mb-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="flex-1 md:min-h-[2.5rem] rounded-md border-gray-200 shadow-lg focus:border-black focus:ring-black my-2 resize-none w-full"
                placeholder={
                  "A tool that makes searching for domain names 10x easier by finding available domain names using the ChatGPT API."
                }
              ></textarea>

              <button
                className="absolute -bottom-4 right-0 text-blue-600 underline cursor-pointer text-sm font-medium"
                onClick={() => {
                  setShowAdvanced(!showAdvanced);
                }}
              >
                {showAdvanced ? "Hide" : "Show"} Advanced
              </button>
            </div>

            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl shadow-lg text-white font-medium py-2 px-4 md:py-8 mb-6"
              onClick={(e) => {
                generateAnswer(e);
              }}
            >
              Find Domains &rarr;
            </button>
          </div>
          {showAdvanced && (
            <>
              <div className="flex flex-col md:flex-row items-stretch md:items-center mx-auto my-2 w-full max-w-screen-lg gap-4 sm:p-0">
                <KeywordInput
                  presets={[]}
                  chips={keywordChips}
                  setChips={setKeywordChips}
                  title="Keywords to consider"
                />
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center mx-auto my-2 w-full max-w-screen-lg gap-4 sm:p-0">
                <KeywordInput
                  presets={["cat"]}
                  chips={similarDomainChips}
                  setChips={setSimilarDomainChips}
                  title="Similar Domains"
                  placeholder="Type a sample domain name and press enter..."
                />
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center mx-auto my-2 w-full max-w-screen-lg gap-4 sm:p-0">
                <KeywordInput
                  presets={TLD_PRESETS}
                  chips={tldChips}
                  setChips={setTldChips}
                  title="Acceptable TLDs (i.e., .com, .net, .org)"
                  placeholder="Type a TLD and press enter..."
                />
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center mx-auto my-2 w-full max-w-screen-lg gap-4 sm:p-0">
                <KeywordInput
                  presets={CUSTOM_INSTRUCTIONS_PRESETS}
                  chips={customInstructions}
                  setChips={setCustomInstructions}
                  title="Custom Instructions 👀"
                  placeholder="Type . to see examples, or create your own..."
                />
              </div>
            </>
          )}

          {!loading && (
            <p className="flex flex-col text-xl md:flex-row items-stretch md:items-center mx-auto mt-8 w-full max-w-screen-lg gap-4 sm:p-0 self-start font-medium mx-auto sm:w-full max-w-screen-lg">
              Available domains:
            </p>
          )}

          {/* <div className="container mx-auto">
            {domainData.map((data, index) => (
              <ListItem
                key={index}
                domain={data.domain}

                // purchaseOptions={data.purchaseOptions}
              />
            ))}
          </div> */}
          {loading ? (
            <>
              <h1 className="text-4xl font-extrabold m-2">Hang tight...</h1>
              <h1 className="text-4xl font-extrabold m-2 text-center">
                This may take up to 30 seconds 😴
              </h1>
              <JellyfishSpinner size={300} />
            </>
          ) : (
            <div className="container mx-auto">
              {godaddyDomains.map((data, index) => (
                <GodaddyListItem
                  key={index}
                  domain={data.domain}
                  price={data.price}
                />
              ))}
            </div>
          )}
        </div>
        <Footer />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
      </div>
    </>
  );
}
