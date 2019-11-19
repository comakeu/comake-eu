const db = require("../database/dbConfig");

function getIssueById(id) {
  return db("issues").where({ id });
}

module.exports = {
  getAllIssues: () => {
    return db
      .select(
        "i.id",
        "i.description",
        "i.latitude",
        "i.longitude",
        "i.imgURL",
        "u.first_name",
        "u.last_name"
      )
      .count("v.user_id", { as: "votes" })
      .from("issues as i")
      .leftJoin("votes as v", "i.id", "v.issue_id")
      .join("users as u", "i.user_id", "u.id")
      .groupBy("i.id")
      .orderBy("votes", "desc");
  },
  getIssueById,
  createIssue: issue => {
    return db("issues")
      .insert(issue)
      .then(([id]) => getIssueById(id));
  },
  updateIssue: (id, issue) => {
    return db("issues")
      .where({ id })
      .update(issue)
      .then(() => getIssueById(id));
  },
  deleteIssue: id => {
    return db("issues")
      .where({ id })
      .del();
  }
};
