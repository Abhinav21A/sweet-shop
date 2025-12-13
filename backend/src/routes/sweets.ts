import { Router } from "express";
import {
  createSweet,
  listSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "../controllers/sweetsController";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, listSweets);
router.get("/search", authenticate, searchSweets);
router.post("/", authenticate, requireAdmin, createSweet);
router.put("/:id", authenticate, requireAdmin, updateSweet);
router.delete("/:id", authenticate, requireAdmin, deleteSweet);

router.post("/:id/purchase", authenticate, purchaseSweet);
router.post("/:id/restock", authenticate, requireAdmin, restockSweet);

export default router;
