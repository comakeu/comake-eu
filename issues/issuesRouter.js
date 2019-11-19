const express = require("express");
const { restricted } = require("../auth/authMiddleware");
const issues = require("./issuesModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await issues.getAllIssues();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", (req, res) => {});

router.post("/", restricted, (req, res) => {});

router.put("/:id", restricted, (req, res) => {});

router.delete("/:id", restricted, (req, res) => {});

module.exports = router;
