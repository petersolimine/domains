// Filename: pages/api/check_domains.js
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// initialize the env vars
import dotenv from "dotenv";
dotenv.config();

const godaddy_api_url = process.env.GODADDY_PROD_API_URL;
const godaddy_api_key = process.env.GODADDY_PROD_API_KEY;
const godaddy_api_secret = process.env.GODADDY_PROD_API_SECRET;

async function checkDomainAvailability(domains) {
  try {
    const response = await axios({
      method: "post",
      url: godaddy_api_url + "/v1/domains/available?checkType=FULL",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization":
          "sso-key " + godaddy_api_key + ":" + godaddy_api_secret,
      },
      data: domains,
    });

    const availableDomains = response.data.domains.filter(
      (domain) => domain.available
    );
    return availableDomains;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const domains = req.body.domains;
    if (!Array.isArray(domains)) {
      console.log(domains);
      res.status(400).json({ error: "domains must be an array of strings" });
      return;
    }

    const availableDomains = await checkDomainAvailability(domains);
    res.status(200).json({ availableDomains });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
