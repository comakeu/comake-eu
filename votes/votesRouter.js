const express = require("express");
const { restricted } = require("../auth/authMiddleware");
const votes = require("./votesModel");
const {
  validateVote,
  validateIssue,
  validateUser,
  checkDuplicate
} = require("./votesMiddleware");

const router = express.Router();

router.post(
  "/",
  restricted,
  validateVote,
  validateIssue,
  validateUser,
  checkDuplicate,
  (req, res) => {
    votes
      .createVote(req.body)
      .then(() => {
        res.status(201).json({ message: "Vote successfully created!" });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }
);

module.exports = router;
