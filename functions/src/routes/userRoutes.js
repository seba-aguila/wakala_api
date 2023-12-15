import { Router } from "express";
import createUser from "../controllers/userControllers.js";

const router = Router();

// router.get('/users/getUser', getUser);
router.post('/users/createUser', createUser);
// router.get("/users/getAllUsers", getAllUsers);
// router.get("/users/getBusinessHours", getBusinessSetup);
// router.patch("/users/updateBusinessHours", updateBusinessSetup);

export default router;