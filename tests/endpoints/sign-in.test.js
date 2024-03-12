import { PrismaClient, Prisma } from "@prisma/client";
import request from "supertest";
import app from "../../app.js";

async function cleanupDatabase() {
  const prisma = new PrismaClient();
  const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

  return Promise.all(
    modelNames.map((modelName) => prisma[modelName.toLowerCase()].deleteMany()),
  );
}

describe("POST /auth", () => {
  const user = {
    name: "John",
    email: "john9@example.com",
    password: "insecure",
  };

  beforeAll(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  it("should return an access token upon successful sign-in", async () => {
    await request(app)
      .post("/users")
      .send(user)
      .set("Accept", "application/json");

    const signInRes = await request(app)
      .post("/auth")
      .send(user)
      .set("Accept", "application/json");
    expect(signInRes.statusCode).toBe(200);
    expect(signInRes.body.accessToken).toBeDefined();
  });

  it("should fail because wrong email", async () => {
    const signUpRes = await request(app).post("/users").send(user);

    const signInRes = await request(app)
      .post("/auth")
      .send({ email: "johnnyboi@example.com", password: "insecure" })
      .set("Accept", "application/json");
    expect(signInRes.statusCode).toBe(401);
    expect(signInRes.body.accessToken).toBe(undefined);
  });

  it("should fail because wrong password", async () => {
    const signUpRes = await request(app).post("/users").send(user);

    const signInRes = await request(app)
      .post("/auth")
      .send({ email: "john9@example.com", password: "short" })
      .set("Accept", "application/json");
    expect(signInRes.statusCode).toBe(401);
    expect(signInRes.body.accessToken).toBe(undefined);
  });
});
