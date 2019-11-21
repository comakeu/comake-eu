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
            description: 'Pothole in road',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            user_id: 1,
            first_name: 'Shaun',
            last_name: 'Orpen',
            votes: 3
          },
          {
            id: 2,
            description: 'Broken sign',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1558882424-680ab6c3b31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            user_id: 1,
            first_name: 'Shaun',
            last_name: 'Orpen',
            votes: 1
          },
          {
            id: 3,
            description: 'Fallen tree',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            user_id: 1,
            first_name: 'Shaun',
            last_name: 'Orpen',
            votes: 1
          },
          {
            id: 4,
            description: 'Broken manhole cover',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80',
            user_id: 3,
            first_name: 'Judith',
            last_name: 'Orpen',
            votes: 1
          },
          {
            id: 5,
            description: 'Overgrown path',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1465765639406-044153778532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            user_id: 3,
            first_name: 'Judith',
            last_name: 'Orpen',
            votes: 0
          },
          {
            id: 6,
            description: 'Flytipped rubbish',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80',
            user_id: 3,
            first_name: 'Judith',
            last_name: 'Orpen',
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
            description: 'Pothole in road',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            user_id: 1,
            first_name: 'Shaun',
            last_name: 'Orpen',
            votes: 3
          },
          {
            id: 2,
            description: 'Broken sign',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1558882424-680ab6c3b31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            user_id: 1,
            first_name: 'Shaun',
            last_name: 'Orpen',
            votes: 1
          },
          {
            id: 3,
            description: 'Fallen tree',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            user_id: 1,
            first_name: 'Shaun',
            last_name: 'Orpen',
            votes: 1
          },
          {
            id: 4,
            description: 'Broken manhole cover',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80',
            user_id: 3,
            first_name: 'Judith',
            last_name: 'Orpen',
            votes: 1
          },
          {
            id: 5,
            description: 'Overgrown path',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1465765639406-044153778532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            user_id: 3,
            first_name: 'Judith',
            last_name: 'Orpen',
            votes: 0
          },
          {
            id: 6,
            description: 'Flytipped rubbish',
            latitude: 51.969356,
            longitude: 1.100908,
            imgURL: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80',
            user_id: 3,
            first_name: 'Judith',
            last_name: 'Orpen',
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
          description: 'Pothole in road',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          user_id: 1,
          first_name: 'Shaun',
          last_name: 'Orpen',
          votes: [
            { user_id: 1, first_name: 'Shaun', last_name: 'Orpen' },
            { user_id: 2, first_name: 'David', last_name: 'Orpen' },
            { user_id: 3, first_name: 'Judith', last_name: 'Orpen' }
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
          description: 'Broken sign',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1558882424-680ab6c3b31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          user_id: 1,
          first_name: 'Shaun',
          last_name: 'Orpen',
          votes: [ { user_id: 1, first_name: 'Shaun', last_name: 'Orpen' } ]
        });
    });
    test("returns correct issue 3 when authed", () => {
      return request(server)
        .get("/api/issues/3")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 3,
          description: 'Fallen tree',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          user_id: 1,
          first_name: 'Shaun',
          last_name: 'Orpen',
          votes: [ { user_id: 2, first_name: 'David', last_name: 'Orpen' } ]
        });
    });
    test("returns correct issue 4 when authed", () => {
      return request(server)
        .get("/api/issues/4")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 4,
          description: 'Broken manhole cover',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80',
          user_id: 3,
          first_name: 'Judith',
          last_name: 'Orpen',
          votes: [ { user_id: 1, first_name: 'Shaun', last_name: 'Orpen' } ]
        });
    });
    test("returns correct issue 5 when authed", () => {
      return request(server)
        .get("/api/issues/5")
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 5,
          description: 'Overgrown path',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1465765639406-044153778532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          user_id: 3,
          first_name: 'Judith',
          last_name: 'Orpen',
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
          description: 'Flytipped rubbish',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80',
          user_id: 3,
          first_name: 'Judith',
          last_name: 'Orpen',
          votes: []
        });
    });
    test("returns correct issue 1 when not authed", () => {
      return request(server)
        .get("/api/issues/1")
        .expect(200)
        .expect({
          id: 1,
          description: 'Pothole in road',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          user_id: 1,
          first_name: 'Shaun',
          last_name: 'Orpen',
          votes: [
            { user_id: 1, first_name: 'Shaun', last_name: 'Orpen' },
            { user_id: 2, first_name: 'David', last_name: 'Orpen' },
            { user_id: 3, first_name: 'Judith', last_name: 'Orpen' }
          ]
        });
    });
    test("returns correct issue 2 when not authed", () => {
      return request(server)
        .get("/api/issues/2")
        .expect(200)
        .expect({
          id: 2,
          description: 'Broken sign',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1558882424-680ab6c3b31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          user_id: 1,
          first_name: 'Shaun',
          last_name: 'Orpen',
          votes: [ { user_id: 1, first_name: 'Shaun', last_name: 'Orpen' } ]
        });
    });
    test("returns correct issue 3 when not authed", () => {
      return request(server)
        .get("/api/issues/3")
        .expect(200)
        .expect({
          id: 3,
          description: 'Fallen tree',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1517660029921-0cbea2f15f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          user_id: 1,
          first_name: 'Shaun',
          last_name: 'Orpen',
          votes: [ { user_id: 2, first_name: 'David', last_name: 'Orpen' } ]
        });
    });
    test("returns correct issue 4 when not authed", () => {
      return request(server)
        .get("/api/issues/4")
        .expect(200)
        .expect({
          id: 4,
          description: 'Broken manhole cover',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80',
          user_id: 3,
          first_name: 'Judith',
          last_name: 'Orpen',
          votes: [ { user_id: 1, first_name: 'Shaun', last_name: 'Orpen' } ]
        });
    });
    test("returns correct issue 5 when not authed", () => {
      return request(server)
        .get("/api/issues/5")
        .expect(200)
        .expect({
          id: 5,
          description: 'Overgrown path',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1465765639406-044153778532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          user_id: 3,
          first_name: 'Judith',
          last_name: 'Orpen',
          votes: []
        });
    });
    test("returns correct issue 6 when not authed", () => {
      return request(server)
        .get("/api/issues/6")
        .expect(200)
        .expect({
          id: 6,
          description: 'Flytipped rubbish',
          latitude: 51.969356,
          longitude: 1.100908,
          imgURL: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80',
          user_id: 3,
          first_name: 'Judith',
          last_name: 'Orpen',
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
    test("creates new issue when authed", () => {
      return request(server)
        .post("/api/issues")
        .send({
          description: "Test issue",
          latitude: "0",
          longitude: "0",
          imgURL: "#",
          user_id: "3"
        })
        .set("cookie", cookie)
        .expect(201)
        .expect({
          id: 7,
          description: 'Test issue',
          latitude: 0,
          longitude: 0,
          imgURL: '#',
          user_id: 3,
          first_name: 'Judith',
          last_name: 'Orpen'
        });
    });
    test("does not create new issue when not authed", () => {
      return request(server)
        .post("/api/issues")
        .send({
          description: "Test issue",
          latitude: "0",
          longitude: "0",
          imgURL: "#",
          user_id: "3"
        })
        .expect(401)
        .expect({ message: "Please log in to access this resource." });
    });
    test("does not create new issue when not missing data", () => {
      return request(server)
        .post("/api/issues")
        .send({
          description: "Test issue",
          latitude: "0",
          imgURL: "#",
          user_id: "3"
        })
        .set("cookie", cookie)
        .expect(400)
        .expect({
          message:
            "Please ensure the new issues has a description, latitude, longitude, user_id and imgURL"
        });
    });
  });
  describe("PUT /api/issues/:id", () => {
    test("edits existing issue when authed", () => {
      return request(server)
        .put("/api/issues/7")
        .send({
          latitude: "1",
          longitude: "1"
        })
        .set("cookie", cookie)
        .expect(200)
        .expect({
          id: 7,
          description: 'Test issue',
          latitude: 1,
          longitude: 1,
          imgURL: '#',
          user_id: 3,
          first_name: 'Judith',
          last_name: 'Orpen'
        });
    });
    test("does not edit existing issue when not authed", () => {
      return request(server)
        .put("/api/issues/7")
        .send({
          latitude: "2",
          longitude: "2"
        })
        .expect(401)
        .expect({ message: "Please log in to access this resource." });
    });
    test("does not edit existing issue when missing data", () => {
      return request(server)
        .put("/api/issues/7")
        .send({})
        .set("cookie", cookie)
        .expect(400)
        .expect({
          message:
            "Please ensure the updated issue has a new description, latitude, longitude, user_id or imgURL"
        });
    });
  });
  describe("DELETE /api/issues/:id", () => {
    test("deletes existing issue when authed", () => {
      return request(server)
        .delete("/api/issues/7")
        .set("cookie", cookie)
        .expect(200)
        .expect({ message: "Issue id 7 successfully deleted." });
    });
    test("does not delete existing issue when not authed", () => {
      return request(server)
        .delete("/api/issues/6")
        .expect(401)
        .expect({ message: "Please log in to access this resource." });
    });
  });
});
