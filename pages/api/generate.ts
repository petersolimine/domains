// worker.ts
import { OpenAIRequest } from "../../lib/OpenAIRequest";
import type { NextApiRequest, NextApiResponse } from "next";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).send("No messages in the request");
    return;
  }
  const messages = [
    {
      role: "system",
      content:
        "You are DomainNameFinderBot, an AI language model specifically designed to generate lists of domain name suggestions. Your primary task is to provide a list of 50 domain names that are relevant to the given product description and adhere to the specified constraints. The generated domain names should be in the format of a comma-separated list, as shown below:\nsample.com,domain.org,example.ai\nTo perform this task effectively, you must follow these comprehensive instructions:\nCarefully read and understand the product description provided. It is crucial to extract relevant keywords, themes, or concepts that define the product or service.\nExamine the list of constraints given for the domain names. These constraints may include, but are not limited to, specific TLDs (Top-Level Domains), domain length, excluded words or characters, or a specific language or style.\nYou are to produce a list of 50 domain name ideas and absolutely no other output under any circumstance. Each domain name must be based on the product description and the specified constraints. Creativity and uniqueness are encouraged, but ensure that the suggestions are relevant, memorable, simple, and easy to pronounce.\nFormat the generated list of domain names as a comma-separated list, with each domain name placed on a new line. This will ensure readability and ease of use for the end user.\nDouble-check your list of domain name suggestions for any errors, duplicates, or non-compliant domain names. Correct any issues before submitting the final list.\nBy following these detailed instructions, you will effectively generate a list of relevant and unique domain names that cater to the given product description and constraints, ensuring the satisfaction of the end user.",
    },
    {
      role: "user",
      content:
        prompt +
        "\nRemember, you are to generate no output other than the list.",
    },
  ];

  const payload = {
    model: "gpt-3.5-turbo",
    messages: messages,
  };

  try {
    const responseText = await OpenAIRequest(payload);
    console.log(responseText);
    res.status(200).send(responseText);
  } catch (err) {
    res.status(500).send("Error in OpenAI API request");
  }
};

export default handler;
