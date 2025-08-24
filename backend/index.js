import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
})

app.get("/events", async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
    );

    await page.goto("https://mlh.io/events", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("div.event", { timeout: 20000 });

    const events = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div.event")).map((el) => ({
        name: el.querySelector(".event-name")?.textContent.trim() || "",
        date: el.querySelector(".event-date")?.textContent.trim() || "",
        location: el.querySelector(".event-location")?.textContent.trim() || "",
        image: el.querySelector(".image-wrap img")?.src || "",
        link: el.querySelector(".event-link")?.href || "",
      }))
    );

    res.status(200).json(events);
  } catch (error) {
    console.error("Scraping failed:", error);
    res.status(500).json({ error: "Failed to scrape events" });
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at Port: ${PORT}`);
});
