const db = require("../database/dbConfig");

function createVote(vote) {
  return db("votes").insert(vote);
}

function deleteVote(vote) {
  return db("votes")
    .where(vote)
    .del();
}

function findVote(vote) {
  return db("votes").where(vote);
}

module.exports = {
  createVote,
  deleteVote,
  findVote
};
