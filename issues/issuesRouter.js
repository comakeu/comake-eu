const express = require("express");
const { restricted } = require("../auth/authMiddleware");
const { validateIssue, validateNewIssue } = require("./issuesMiddleware");
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

router.get("/:id", validateIssue, async (req, res) => {
  try {
    const data = await issues.getIssueById(req.params.id);
    const votes = await issues.getVotesForIssue(req.params.id);
    const result = {
      ...data,
      votes
    };
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", restricted, validateNewIssue, (req, res) => {
  issues
    .createIssue(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.put("/:id", restricted, (req, res) => {});

router.delete("/:id", restricted, (req, res) => {});

module.exports = router;
