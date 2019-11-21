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

describe("usersRouter", () => {
  describe("POST /api/auth/login", () => {
    test("log in as existing user and get cookie", async () => {
      const response = await request(server)
        .post("/api/auth/login")
        .send(user);
      cookie = response.headers["set-cookie"];
    });
  });
  describe("GET /api/users", () => {
    test("returns correct list of users", () => {
      return request(server)
        .get("/api/users")
        .set("cookie", cookie)
        .expect(200)
        .expect([
          {
            id: 1,
            email: "shaun@shaun.com",
            password:
              "$2b$11$yKSaDsRgknQokSzKBnWO7.NXESCMqSpUZH6TEKW3JEcppNAG2aMFq",
            first_name: "Shaun",
            last_name: "Orpen",
            phone: "+44 (0)1234 567890"
          },
          {
            id: 2,
            email: "david@david.com",
            password:
              "$2b$11$yKSaDsRgknQokSzKBnWO7.NXESCMqSpUZH6TEKW3JEcppNAG2aMFq",
            first_name: "David",
            last_name: "Orpen",
            phone: "+44 (0)1234 567891"
          },
          {
            id: 3,
            email: "judith@judith.com",
            password:
              "$2b$11$yKSaDsRgknQokSzKBnWO7.NXESCMqSpUZH6TEKW3JEcppNAG2aMFq",
            first_name: "Judith",
            last_name: "Orpen",
            phone: "+44 (0)1234 567892"
          }
        ]);
    });
    test("returns error if not authed", () => {
      return request(server)
        .get("/api/users")
        .expect(401)
        .expect({ message: "Please log in to access this resource." });
    });
  });
  describe("GET /api/users/:id", () => {
    test("returns correct user for id 1", () => {
      return request(server)
        .get("/api/users/1")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 1,
          email: "shaun@shaun.com",
          first_name: "Shaun",
          last_name: "Orpen",
          phone: "+44 (0)1234 567890"
        });
    });
    test("returns error if not authed", () => {
      return request(server)
        .get("/api/users/1")
        .expect(401)
        .expect({ message: "Please log in to access this resource." });
    });
    test("returns correct user for id 2", () => {
      return request(server)
        .get("/api/users/2")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 2,
          email: "david@david.com",
          first_name: "David",
          last_name: "Orpen",
          phone: "+44 (0)1234 567891"
        });
    });
    test("returns correct user for id 3", () => {
      return request(server)
        .get("/api/users/3")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 3,
          email: "judith@judith.com",
          first_name: "Judith",
          last_name: "Orpen",
          phone: "+44 (0)1234 567892"
        });
    });
    test("returns error message for invalid id 4", () => {
      return request(server)
        .get("/api/users/4")
        .set("cookie", cookie)
        .expect(404)
        .expect({ message: "There is no user with id 4." });
    });
    test("returns error message for invalid id a", () => {
      return request(server)
        .get("/api/users/a")
        .set("cookie", cookie)
        .expect(404)
        .expect({ message: "There is no user with id a." });
    });
  });
  describe("POST /api/users", () => {
    test("correctly creates new user", () => {
      return request(server)
        .post("/api/users")
        .send({
          email: "jeff@jeff.com",
          password: "1234",
          first_name: "Jeff",
          last_name: "Davies",
          phone: "+44 (0)1234 567894"
        })
        .set("cookie", cookie)
        .expect(201)
        .expect({
          message: "User id 4 successfully created.",
          user: {
            id: 4,
            email: "jeff@jeff.com",
            first_name: "Jeff",
            last_name: "Davies",
            phone: "+44 (0)1234 567894"
          }
        });
    });
    test("errors if duplicate user is created", () => {
      return request(server)
        .post("/api/users")
        .send({
          email: "jeff@jeff.com",
          password: "1234",
          first_name: "Jeff",
          last_name: "Davies",
          phone: "+44 (0)1234 567894"
        })
        .set("cookie", cookie)
        .expect(303)
        .expect({
          message: "There's already an account registered for jeff@jeff.com."
        });
    });
    test("errors if new user is missing required info", () => {
      return request(server)
        .post("/api/users")
        .send({
          email: "jeff@jeff.com",
          password: "1234",
          first_name: "Jeff",
          last_name: "Davies"
        })
        .set("cookie", cookie)
        .expect(400)
        .expect({
          message:
            "Please ensure the new user has an email, password, first_name, last_name and phone number."
        });
    });
  });
  describe("PUT /api/users/:id", () => {
    test("allows edit of valid user", () => {
      return request(server)
        .put("/api/users/4")
        .send({ email: "jeff@jeffdavies.com", password: "4321" })
        .set("cookie", cookie)
        .expect(200)
        .expect({
          message: "User id 4 successfully updated.",
          updatedUser: {
            id: 4,
            email: "jeff@jeffdavies.com",
            first_name: "Jeff",
            last_name: "Davies",
            phone: "+44 (0)1234 567894"
          }
        });
    });
    test("returns error if not authed", () => {
      return request(server)
        .put("/api/users/4")
        .send({ email: "jeff@jeffdavies.com", password: "4321" })
        .expect(401)
        .expect({ message: "Please log in to access this resource." });
    });
    test("does not allow edit of invalid user", () => {
      return request(server)
        .put("/api/users/5")
        .send({ email: "jeff@jeffdavies.com", password: "4321" })
        .set("cookie", cookie)
        .expect(404)
        .expect({ message: "There is no user with id 5." });
    });
    test("does not allow edit to match existing user", () => {
      return request(server)
        .put("/api/users/4")
        .send({ email: "shaun@shaun.com" })
        .set("cookie", cookie)
        .expect(303)
        .expect({
          message: "There's already an account registered for shaun@shaun.com."
        });
    });
    test("does not allow edit with no changes", () => {
      return request(server)
        .put("/api/users/4")
        .set("cookie", cookie)
        .expect(400)
        .expect({
          message:
            "Please ensure the updated user has a new email, password, first_name, last_name or phone number."
        });
    });
  });
  describe("DELETE /api/users/:id", () => {
    test("allows delete valid user", () => {
      return request(server)
        .delete("/api/users/4")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          message: "User id 4 successfully deleted.",
          deletedUser: {
            id: 4,
            email: "jeff@jeffdavies.com",
            first_name: "Jeff",
            last_name: "Davies",
            phone: "+44 (0)1234 567894"
          }
        });
    });
    test("returns error if not authed", () => {
      return request(server)
        .delete("/api/users/4")
        .expect(401)
        .expect({ message: "Please log in to access this resource." });
    });
    test("does not allow delete of invalid user", () => {
      return request(server)
        .delete("/api/users/5")
        .set("cookie", cookie)
        .expect(404)
        .expect({ message: "There is no user with id 5." });
    });
  });
});
