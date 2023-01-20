const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
let server;

beforeAll(done => {
  server = app.listen(99, done);
});

afterAll(done => {
  server.close(done);
});

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test the create user endpoint", () => {
  test("It should create a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "John", email: "john@example.com", password: "password" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "John");
    expect(res.body).toHaveProperty("email", "john@example.com");
  });
});

describe("Test the read user endpoint", () => {
  test("It should return all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("Test the update user endpoint", () => {
    test("It should update an existing user", async () => {
      // Create a user to update
      const user = await request(app)
        .post("/users")
        .send({ name: "John", email: "john@example.com", password: "password" });
  
      // Update the user
      const res = await request(app)
        .patch(`/users/${user._id}`)
        .send({ name: "Jane" });
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Jane");
    });
  });
  
  describe("Test the delete user endpoint", () => {
    test("It should delete an existing user", async () => {
      // Create a user to delete
      const user = await request(app)
        .post("/users")
        .send({ name: "John", email: "john@example.com", password: "password" });
  
      // Delete the user
      const res = await request(app).delete(`/users/${user._id}`);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "User deleted successfully");
    });
  });
  