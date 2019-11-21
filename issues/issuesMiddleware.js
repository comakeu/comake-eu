const issues = require("./issuesModel");

function validateIssue(req, res, next) {
  return issues
    .getIssueById(req.params.id)
    .then(issue => {
      if (issue) {
        req.issue = issue;
        next();
      } else {
        res
          .status(404)
          .json({ message: `There is no issue with id ${req.params.id}.` });
      }
    })
    .catch(error => {
      res.status(404).json({ message: error.message });
    });
}

function validateNewIssue(req, res, next) {
  if (
    req.body &&
    req.body.description &&
    req.body.latitude &&
    req.body.longitude &&
    req.body.user_id &&
    req.body.imgURL
  ) {
    next();
  } else {
    res.status(400).json({
      message:
        "Please ensure the new issues has a description, latitude, longitude, user_id and imgURL"
    });
  }
}

function validateUpdatedIssue(req, res, next) {
  if (
    req.body &&
    !(
      req.body.description ||
      req.body.latitude ||
      req.body.longitude ||
      req.body.user_id ||
      req.body.imgURL
    )
  ) {
    res.status(400).json({
      message:
        "Please ensure the updated issue has a new description, latitude, longitude, user_id or imgURL"
    });
  } else {
    next();
  }
}

module.exports = { validateIssue, validateNewIssue, validateUpdatedIssue };
