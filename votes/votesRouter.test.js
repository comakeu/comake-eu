const knex = require("../database/dbConfig");
const request = require("supertest");
const server = require("../api/server");

let cookie;

const user = {
  email: "shaun@shaun.com",
  password: "1234"
};

beforeAll(() => {
  return knex.seed.run();
});

describe("votesRouter", () => {
  describe("POST /api/auth/login", () => {
    test("log in as existing user and get cookie", async () => {
      const response = await request(server)
        .post("/api/auth/login")
        .send(user);
      cookie = response.headers["set-cookie"];
    });
  });
  describe("POST /api/votes", () => {
    test("allows post new vote when authed", () => {
      return request(server)
        .post("/api/votes")
        .send({ issue_id: "2", user_id: "2" })
        .set("cookie", cookie)
        .expect(201)
        .expect({ message: "Vote successfully created!" });
    });
    test("does not allow post duplicate vote when authed", () => {
      return request(server)
        .post("/api/votes")
        .send({ issue_id: "2", user_id: "2" })
        .set("cookie", cookie)
        .expect(403)
        .expect({ message: "You can't vote for the same issue twice." });
    });
    test("does not allow post vote for invalid issue when authed", () => {
      return request(server)
        .post("/api/votes")
        .send({ issue_id: "7", user_id: "2" })
        .set("cookie", cookie)
        .expect(404)
        .expect({ message: "There is no issue with id 7." });
    });
    test("does not allow post vote for invalid user when authed", () => {
      return request(server)
        .post("/api/votes")
        .send({ issue_id: "2", user_id: "4" })
        .set("cookie", cookie)
        .expect(404)
        .expect({ message: "There is no user with id 4." });
    });
    test("does not allow post new vote when not authed", () => {
      return request(server)
        .post("/api/votes")
        .send({ issue_id: "2", user_id: "3" })
        .expect(401)
        .expect({ message: 'Please log in to access this resource.' });
    });
  });
});
