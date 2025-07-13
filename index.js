import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/**
 * POST — сохранить ответ
 */
app.post("/api/response", async (req, res) => {
  const { name, answer, count } = req.body;

  if (!name || !answer || !count) {
    return res.status(400).json({ error: "Барлық өрістер қажет" });
  }

  try {
    const saved = await prisma.response.create({
      data: { name, answer, count: Number(count) },
    });
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Қате пайда болды" });
  }
});

/**
 * GET — получить все ответы + общее количество гостей
 */
app.get("/api/response", async (req, res) => {
  try {
    const responses = await prisma.response.findMany({
      orderBy: { createdAt: "desc" },
    });

    const totalCount = responses.reduce((sum, r) => sum + r.count, 0);

    res.json({ responses, totalCount });
  } catch (error) {
    res.status(500).json({ error: "Қате болды" });
  }
});

/**
 * DELETE — удалить заявку по id
 */
app.delete("/api/response/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.response.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Жойылды" });
  } catch (error) {
    res.status(404).json({ error: "Табылмады" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
