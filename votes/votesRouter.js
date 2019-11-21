const express = require("express");
const { restricted } = require("../auth/authMiddleware");
const votes = require("./votesModel");
const {
  validateNewVote,
  validateIssue,
  validateUser,
  checkDuplicate,
  validateVote
} = require("./votesMiddleware");

const router = express.Router();

router.post(
  "/",
  restricted,
  validateNewVote,
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

router.delete("/", restricted, validateNewVote, validateVote, (req, res) => {
  votes
    .deleteVote(req.body)
    .then(data => {
      res.status(200).json({ message: `${data} vote successfully deleted` });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
