const bcrypt = require("bcrypt");
const express = require("express");
const users = require("./usersModel");
const {
  validateUser,
  validateNewUser,
  validateUpdatedUser,
  validateDuplicateUser
} = require("./usersMiddleware");
const { restricted } = require("../auth/authMiddleware");

const router = express.Router();

router.get("/", restricted, (req, res) => {
  users
    .getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id", restricted, validateUser, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateNewUser, validateDuplicateUser, (req, res) => {
  const user = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 11)
  };
  users
    .addUser(user)
    .then(user => {
      res.status(201).json({
        message: `User id ${user.id} successfully created.`,
        user
      });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.put(
  "/:id",
  restricted, 
  validateUser,
  validateUpdatedUser,
  validateDuplicateUser,
  (req, res) => {
    if (req.body.password) {
      req.body = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 11)
      };
    }
    users
      .updateUser(req.params.id, req.body)
      .then(user => {
        res.status(200).json({
          message: `User id ${user.id} successfully updated.`,
          updatedUser: user
        });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }
);

router.delete("/:id", restricted, validateUser, (req, res) => {
  users
    .deleteUser(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `User id ${req.params.id} successfully deleted.`,
        deletedUser: req.user
      });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
