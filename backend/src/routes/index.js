import express from "express";
import { userRoutes } from "./userRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
export const apiRouter = router;
