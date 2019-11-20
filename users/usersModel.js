const db = require("../database/dbConfig");
const { findByEmail,findById } = require("../database/utilityFunctions");

module.exports = {
  getAllUsers: () => {
    return db("users");
  },
  addUser: user => {
    return db("users")
      .insert(user)
      .then(ids => {
        const [id] = ids;
        return findById(id);
      });
  },
  updateUser: (id, newUserDetails) => {
    return db("users")
      .where({ id })
      .update(newUserDetails)
      .then(() => findById(id));
  },
  deleteUser: id => {
    return db("users")
      .where({ id })
      .del();
  },
  findById,
  findByEmail
};
