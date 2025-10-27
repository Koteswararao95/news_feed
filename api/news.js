import axios from "axios";

export default async function handler(req, res) {
  const { query, category = "general", page = 1 } = req.query;
  const apiKey = process.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  const baseUrl =
    query && query.trim().length > 0
      ? "https://newsapi.org/v2/everything"
      : "https://newsapi.org/v2/top-headlines";

  try {
    const response = await axios.get(baseUrl, {
      params: {
        apiKey,
        q: query || undefined,
        pageSize: 12,
        page,
        ...(query
          ? {}
          : {
              country: "us",
              category: category.toLowerCase(),
            }),
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error("API error:", err.message);
    res.status(500).json({ error: err.message });
  }
}
