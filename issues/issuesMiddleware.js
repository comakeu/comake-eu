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

module.exports = { validateIssue };
