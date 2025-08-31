const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Result = require("../models/Result");

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/result", async (req, res) => {
  const { username, score } = req.body;
  try {
    const result = new Result({ username, score });
    await result.save();
    res.json({ message: "Result saved!", result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
