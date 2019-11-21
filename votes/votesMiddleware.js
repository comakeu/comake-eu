const users = require("../users/usersModel");
const issues = require("../issues/issuesModel");
const votes = require("./votesModel");

function validateUser(req, res, next) {
  users
    .findById(req.body.user_id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res
          .status(404)
          .json({ message: `There is no user with id ${req.body.user_id}.` });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}

function validateIssue(req, res, next) {
  issues
    .getIssueById(req.body.issue_id)
    .then(issue => {
      if (issue) {
        req.issue = issue;
        next();
      } else {
        res
          .status(404)
          .json({ message: `There is no issue with id ${req.body.issue_id}.` });
      }
    })
    .catch(error => {
      res.status(404).json({ message: error.message });
    });
}

function validateNewVote(req, res, next) {
  if (req.body && req.body.user_id && req.body.issue_id) {
    next();
  } else {
    res.status(400).json({
      message: "Please ensure the vote has both a user_id and an issue_id."
    });
  }
}

function validateVote(req, res, next) {
  votes
    .findVote(req.body)
    .then(data => {
      if (data.length) {
        next();
      } else {
        res.status(404).json({
          message: `There is no vote with user_id ${req.body.user_id} and issue_id ${req.body.issue_id}.`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}

function checkDuplicate(req, res, next) {
  votes
    .findVote(req.body)
    .then(data => {
      if (data.length) {
        res
          .status(403)
          .json({ message: "You can't vote for the same issue twice." });
      } else {
        next();
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}

module.exports = {
  validateIssue,
  validateUser,
  validateNewVote,
  checkDuplicate,
  validateVote
};
