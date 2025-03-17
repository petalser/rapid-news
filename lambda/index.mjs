import OpenAI from "openai";
import axios from "axios";
import * as cheerio from "cheerio";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*", //please, set appropriate for your case
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const scrapeArticle = async (url) => {
    try {
        const { data } = await axios.get(url, { timeout: 8000 });
        const $ = cheerio.load(data);

        let content = $("article").text().trim() || $("p").text().trim();
        content = content.replace(/\s+/g, " ");

        return content.length > 100 ? content : null;
    } catch (error) {
        console.error("Scraping error:", error.message);
        return null;
    }
}


//main function for AWS Lambda
export async function handler(event) {
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: CORS_HEADERS, body: "" };
    }

    try {
        const { url } = JSON.parse(event.body || "{}");

        if (!url) {
            return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: "Missing URL" }) };
        }

        const articleText = await scrapeArticle(url);
        if (!articleText) {
            return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: "Could not scrape article" }) };
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: `Summarize: ${articleText}` }],
            max_tokens: 150,
        });

        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: JSON.stringify({ summary: articleText }),
        };
    } catch (error) {
        console.error("Handler error:", error.message);
        return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: "Internal Server Error" }) };
    }
}
