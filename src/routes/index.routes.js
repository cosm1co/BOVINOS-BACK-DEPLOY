import { Router } from "express";
import {
    getAllBovines,
    getBovineById,
    updateBovine,
    createBovine,
    deleteBovine,
} from "../controllers/bovine.controllers.js";

const router = Router();
// Brings all bovines from the database
router.get("/bovine/allbovines", getAllBovines);
// Bring the bovine according to its id
router.get("/bovine/:id", getBovineById);
// Modify bovine data
router.put("/bovine/update/:id", updateBovine);
// Add a new bovine to the database
router.post("/bovine/add", createBovine);
// Delete a bovine from the database
router.delete("/bovine/delete/:id", deleteBovine);

export default router;
