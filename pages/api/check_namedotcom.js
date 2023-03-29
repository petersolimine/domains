// Filename: pages/api/check_namedotcom.js
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// initialize the env vars
import dotenv from "dotenv";
dotenv.config();

const namedotcom_api_url = process.env.NAME_DOTCOM_PROD_API_URL;
const namedotcom_api_key = process.env.NAME_DOTCOM_PROD_API_KEY;

async function checkDomainAvailability(domains) {
  try {
    const response = await axios({
      method: "post",
      url: namedotcom_api_url + "/v4/domains:checkAvailability",
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "peter@speaktolearn.us",
        password: namedotcom_api_key,
      },
      data: {
        domainNames: domains,
      },
    });

    const available = response.data.results.filter(
      (domain) => domain.purchasable
    );
    return available;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const domains = req.body.domains;
    if (!Array.isArray(domains)) {
      // console.log(domains);
      res.status(400).json({ error: "domains must be an array of strings" });
      return;
    }

    const available = await checkDomainAvailability(domains);
    res.status(200).json({ available });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
