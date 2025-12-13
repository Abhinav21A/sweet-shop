import request from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth", () => {
  it("registers a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "password123"
    });
    expect([200,201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("token");
  });

  it("logs in", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
