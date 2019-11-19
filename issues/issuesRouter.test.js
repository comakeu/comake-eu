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

describe("issuesRouter", () => {
  describe("POST /api/auth/login", () => {
    test("log in as existing user and get cookie", async () => {
      const response = await request(server)
        .post("/api/auth/login")
        .send(user);
      cookie = response.headers["set-cookie"];
    });
  });
  describe("GET /api/issues", () => {
    test("returns correct list of issues when authed", () => {
      return request(server)
        .get("/api/issues")
        .set("cookie", cookie)
        .expect(200)
        .expect([
          {
            id: 1,
            description: "Pothole in road",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
            first_name: "Shaun",
            last_name: "Orpen",
            votes: 3
          },
          {
            id: 2,
            description: "Broken sign",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1558882424-680ab6c3b31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
            first_name: "Shaun",
            last_name: "Orpen",
            votes: 1
          },
          {
            id: 3,
            description: "Fallen tree",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
            first_name: "Shaun",
            last_name: "Orpen",
            votes: 1
          },
          {
            id: 4,
            description: "Broken manhole cover",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1545459720-aac8509eb02c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80",
            first_name: "Judith",
            last_name: "Orpen",
            votes: 1
          },
          {
            id: 5,
            description: "Overgrown path",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1465765639406-044153778532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
            first_name: "Judith",
            last_name: "Orpen",
            votes: 0
          },
          {
            id: 6,
            description: "Flytipped rubbish",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80",
            first_name: "Judith",
            last_name: "Orpen",
            votes: 0
          }
        ]);
    });
    test("returns correct list of issues when not authed", () => {
      return request(server)
        .get("/api/issues")
        .expect(200)
        .expect([
          {
            id: 1,
            description: "Pothole in road",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
            first_name: "Shaun",
            last_name: "Orpen",
            votes: 3
          },
          {
            id: 2,
            description: "Broken sign",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1558882424-680ab6c3b31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
            first_name: "Shaun",
            last_name: "Orpen",
            votes: 1
          },
          {
            id: 3,
            description: "Fallen tree",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
            first_name: "Shaun",
            last_name: "Orpen",
            votes: 1
          },
          {
            id: 4,
            description: "Broken manhole cover",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1545459720-aac8509eb02c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80",
            first_name: "Judith",
            last_name: "Orpen",
            votes: 1
          },
          {
            id: 5,
            description: "Overgrown path",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1465765639406-044153778532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
            first_name: "Judith",
            last_name: "Orpen",
            votes: 0
          },
          {
            id: 6,
            description: "Flytipped rubbish",
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL:
              "https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80",
            first_name: "Judith",
            last_name: "Orpen",
            votes: 0
          }
        ]);
    });
  });
  describe("GET /api/issues/:id", () => {
    test("returns correct issue 1 when authed", () => {
      return request(server)
        .get("/api/issues/1")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 1,
          description: "Pothole in road",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 1,
          imgURL:
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
          votes: [
            { first_name: "Shaun", last_name: "Orpen" },
            { first_name: "David", last_name: "Orpen" },
            { first_name: "Judith", last_name: "Orpen" }
          ]
        });
    });
    test("returns correct issue 2 when authed", () => {
      return request(server)
        .get("/api/issues/2")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 2,
          description: "Broken sign",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 1,
          imgURL:
            "https://images.unsplash.com/photo-1558882424-680ab6c3b31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
          votes: [{ first_name: "Shaun", last_name: "Orpen" }]
        });
    });
    test("returns correct issue 3 when authed", () => {
      return request(server)
        .get("/api/issues/3")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 3,
          description: "Fallen tree",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 1,
          imgURL:
            "https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
          votes: [{ first_name: "David", last_name: "Orpen" }]
        });
    });
    test("returns correct issue 4 when authed", () => {
      return request(server)
        .get("/api/issues/4")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 4,
          description: "Broken manhole cover",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 3,
          imgURL:
            "https://images.unsplash.com/photo-1545459720-aac8509eb02c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80",
          votes: [{ first_name: "Shaun", last_name: "Orpen" }]
        });
    });
    test("returns correct issue 5 when authed", () => {
      return request(server)
        .get("/api/issues/5")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 5,
          description: "Overgrown path",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 3,
          imgURL:
            "https://images.unsplash.com/photo-1465765639406-044153778532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
          votes: []
        });
    });
    test("returns correct issue 6 when authed", () => {
      return request(server)
        .get("/api/issues/6")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 6,
          description: "Flytipped rubbish",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 3,
          imgURL:
            "https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80",
          votes: []
        });
    });
    test("returns correct issue 1 when not authed", () => {
      return request(server)
        .get("/api/issues/1")
        .expect(200)
        .expect({
          id: 1,
          description: "Pothole in road",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 1,
          imgURL:
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
          votes: [
            { first_name: "Shaun", last_name: "Orpen" },
            { first_name: "David", last_name: "Orpen" },
            { first_name: "Judith", last_name: "Orpen" }
          ]
        });
    });
    test("returns correct issue 2 when not authed", () => {
      return request(server)
        .get("/api/issues/2")
        .expect(200)
        .expect({
          id: 2,
          description: "Broken sign",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 1,
          imgURL:
            "https://images.unsplash.com/photo-1558882424-680ab6c3b31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
          votes: [{ first_name: "Shaun", last_name: "Orpen" }]
        });
    });
    test("returns correct issue 3 when not authed", () => {
      return request(server)
        .get("/api/issues/3")
        .expect(200)
        .expect({
          id: 3,
          description: "Fallen tree",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 1,
          imgURL:
            "https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
          votes: [{ first_name: "David", last_name: "Orpen" }]
        });
    });
    test("returns correct issue 4 when not authed", () => {
      return request(server)
        .get("/api/issues/4")
        .expect(200)
        .expect({
          id: 4,
          description: "Broken manhole cover",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 3,
          imgURL:
            "https://images.unsplash.com/photo-1545459720-aac8509eb02c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80",
          votes: [{ first_name: "Shaun", last_name: "Orpen" }]
        });
    });
    test("returns correct issue 5 when not authed", () => {
      return request(server)
        .get("/api/issues/5")
        .expect(200)
        .expect({
          id: 5,
          description: "Overgrown path",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 3,
          imgURL:
            "https://images.unsplash.com/photo-1465765639406-044153778532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
          votes: []
        });
    });
    test("returns correct issue 6 when not authed", () => {
      return request(server)
        .get("/api/issues/6")
        .expect(200)
        .expect({
          id: 6,
          description: "Flytipped rubbish",
          latitude: 51.969356,
          longitude: 1.100908,
          user_id: 3,
          imgURL:
            "https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80",
          votes: []
        });
    });
    test("returns error for invalid issue 7 when authed", () => {
      return request(server)
        .get("/api/issues/7")
        .set("cookie", cookie)
        .expect(404)
        .expect({ message: "There is no issue with id 7." });
    });
    test("returns error for invalid issue 7 when not authed", () => {
      return request(server)
        .get("/api/issues/7")
        .expect(404)
        .expect({ message: "There is no issue with id 7." });
    });
  });
  describe("POST /api/issues", () => {
    test("creates new issue when authed", () => {});
    test("does not create new issue when not authed", () => {});
  });
  describe("PUT /api/issues/:id", () => {
    test("edits existing issue when authed", () => {});
    test("does not edit existing issue when not authed", () => {});
  });
  describe("DELETE /api/issues/:id", () => {
    test("deletes existing issue when authed", () => {});
    test("does not delete existing issue when not authed", () => {});
  });
});
