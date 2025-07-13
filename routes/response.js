const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 🔍 Получить все заявки + общее число гостей
router.get("/", async (req, res) => {
  try {
    const responses = await prisma.response.findMany({
      orderBy: { createdAt: "desc" },
    });

    const totalCount = responses.reduce((sum, r) => sum + r.count, 0);

    res.json({ responses, totalCount });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ➕ Добавить заявку
router.post("/", async (req, res) => {
  const { name, answer, count } = req.body;
  try {
    const response = await prisma.response.create({
      data: { name, answer, count },
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: "Failed to create response" });
  }
});

// 🗑 Удалить заявку по id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.response.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(404).json({ error: "Not found" });
  }
});

module.exports = router;
