const express = require("express");
const { restricted } = require("../auth/authMiddleware");
const {
  validateIssue,
  validateNewIssue,
  validateUpdatedIssue
} = require("./issuesMiddleware");
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
    const votes = await issues.getVotesForIssue(req.params.id);
    const result = {
      ...req.issue,
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

router.put(
  "/:id",
  restricted,
  validateIssue,
  validateUpdatedIssue,
  (req, res) => {
    issues
      .updateIssue(req.params.id, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }
);

router.delete("/:id", restricted, validateIssue, (req, res) => {
  issues
    .deleteIssue(req.params.id)
    .then(data => {
      res
        .status(200)
        .json({ message: `Issue id ${req.params.id} successfully deleted.` });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
