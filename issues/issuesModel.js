const db = require("../database/dbConfig");

function getIssueById(id) {
  return db
    .select(
      "i.id",
      "i.description",
      "i.latitude",
      "i.longitude",
      "i.imgURL",
      "i.user_id",
      "u.first_name",
      "u.last_name"
    )
    .from("issues as i")
    .join("users as u", "i.user_id", "u.id")
    .where("i.id", id)
    .first();
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
        "i.user_id",
        "u.first_name",
        "u.last_name"
      )
      .count("v.user_id", { as: "votes" })
      .from("issues as i")
      .leftJoin("votes as v", "i.id", "v.issue_id")
      .join("users as u", "i.user_id", "u.id")
      .groupBy(
        "i.id",
        "i.description",
        "i.latitude",
        "i.longitude",
        "i.imgURL",
        "i.user_id",
        "u.first_name",
        "u.last_name"
      )
      .orderBy("votes", "desc");
  },
  getIssueById,
  createIssue: issue => {
    return db("issues")
      .insert(issue, "id")
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
  },
  getVotesForIssue: id => {
    return db("votes")
      .where({ issue_id: id })
      .join("users", "votes.user_id", "users.id")
      .select("votes.user_id", "users.first_name", "users.last_name");
  }
};
