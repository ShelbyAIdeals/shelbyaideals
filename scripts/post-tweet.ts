import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(new URL(".", import.meta.url).pathname, "../.env.local") });

const client = new TwitterApi({
  appKey: process.env.X_API_KEY!,
  appSecret: process.env.X_API_SECRET!,
  accessToken: process.env.X_ACCESS_TOKEN!,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET!,
});

const tweet = `AI tools in 2026 are wild:

- Pictory turns blog posts into videos for $19/mo
- Make.com replaces Zapier at 1/5th the price
- Mangools gives you 90% of Semrush for $30/mo

I reviewed 40 of these tools. The full honest breakdown:

shelby-ai.com

#AItools #SaaS`;

async function main() {
  // Verify keys are loaded
  const keys = {
    appKey: process.env.X_API_KEY?.slice(0, 5) + "...",
    appSecret: process.env.X_API_SECRET?.slice(0, 5) + "...",
    accessToken: process.env.X_ACCESS_TOKEN?.slice(0, 5) + "...",
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET?.slice(0, 5) + "...",
  };
  console.log("Keys loaded:", keys);

  try {
    // Verify credentials first
    const me = await client.v2.me();
    console.log("Authenticated as:", me.data.username);

    const result = await client.v2.tweet(tweet);
    console.log("Tweet posted successfully!");
    console.log("Tweet ID:", result.data.id);
    console.log("URL: https://x.com/i/status/" + result.data.id);
  } catch (err: any) {
    console.error("Failed to post tweet:");
    if (err?.data) console.error("API error:", JSON.stringify(err.data, null, 2));
    if (err?.code) console.error("Error code:", err.code);
    if (err?.headers) {
      const rateHeaders = Object.fromEntries(
        Object.entries(err.headers || {}).filter(([k]) => k.startsWith("x-"))
      );
      if (Object.keys(rateHeaders).length) console.error("Rate headers:", rateHeaders);
    }
    console.error("Full error:", err?.message || err);
    process.exit(1);
  }
}

main();
