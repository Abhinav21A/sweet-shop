import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createSweet(req: Request, res: Response) {
  const { name, category, price, quantity } = req.body;
  if (!name || !category || price == null || quantity == null) return res.status(400).json({ message: "Missing fields" });
  const sweet = await prisma.sweet.create({ data: { name, category, price: Number(price), quantity: Number(quantity) } });
  res.status(201).json(sweet);
}

export async function listSweets(req: Request, res: Response) {
  const sweets = await prisma.sweet.findMany({ orderBy: { id: "asc" } });
  res.json(sweets);
}

export async function searchSweets(req: Request, res: Response) {
  const { name, category, minPrice, maxPrice } = req.query;
  const where: any = {};
  if (name) where.name = { contains: String(name), mode: "insensitive" };
  if (category) where.category = { equals: String(category), mode: "insensitive" };
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }
  const sweets = await prisma.sweet.findMany({ where });
  res.json(sweets);
}

export async function updateSweet(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const sweet = await prisma.sweet.update({ where: { id }, data });
    res.json(sweet);
  } catch (err) {
    res.status(404).json({ message: "Sweet not found" });
  }
}

export async function deleteSweet(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.sweet.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: "Sweet not found" });
  }
}

export async function purchaseSweet(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const sweet = await prisma.sweet.findUnique({ where: { id } });
    if (!sweet) return res.status(404).json({ message: "Not found" });
    if (sweet.quantity <= 0) return res.status(400).json({ message: "Out of stock" });
    const updated = await prisma.sweet.update({ where: { id }, data: { quantity: sweet.quantity - 1 } });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
}

export async function restockSweet(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ message: "Amount required" });
  try {
    const sweet = await prisma.sweet.findUnique({ where: { id } });
    if (!sweet) return res.status(404).json({ message: "Not found" });
    const updated = await prisma.sweet.update({ where: { id }, data: { quantity: sweet.quantity + Number(amount) } });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
}
