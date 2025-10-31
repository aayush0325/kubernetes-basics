import express from "express";
import dotenv from "dotenv";
import { createClient } from "redis";
import cors from "cors";
import { collectDefaultMetrics, register } from "prom-client";

dotenv.config();

collectDefaultMetrics();

const app = express();
app.use(cors());

const client = createClient({
	url: process.env.REDIS_URL || "redis://localhost:6379"
});

client.on("error", (err) => console.error("Redis Client Error:", err));
await client.connect();

app.get("/", (_, res) => res.json({ msg: "healthy" }));

app.get("/set/:value", async (req, res) => {
	try {
		const { value } = req.params;
		await client.set("status", value || "WORKING");
		res.json({ msg: `Key 'status' set to ${value || "WORKING"}` });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/get/:key", async (req, res) => {
	try {
		const { key } = req.params;
		const value = await client.get(key);
		if (value === null) return res.status(404).json({ error: "Key not found" });
		res.json({ key, value });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/metrics", async (_, res) => {
	try {
		res.set("Content-Type", register.contentType);
		res.end(await register.metrics());
	} catch (err) {
		res.status(500).end(err);
	}
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
