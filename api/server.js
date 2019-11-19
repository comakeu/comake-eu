const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const authRouter = require("../auth/authRouter");
const issuesRouter = require("../issues/issuesRouter");
const usersRouter = require("../users/usersRouter");
const votesRouter = require("../votes/votesRouter");

const sessionConfig = {
  name: "sessionId",
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60, httpOnly: false },
  store: new KnexSessionStore({
    knex: require("../database/dbConfig"),
    tablename: "sessions",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/issues", issuesRouter);
server.use("/api/users", usersRouter);
server.use("/api/votes", votesRouter);

server.get("*", (req, res) => {
  res
    .status(200)
    .json({ message: `API is up and running on port ${process.env.PORT}!` });
});

module.exports = server;
