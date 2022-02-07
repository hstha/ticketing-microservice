import express from "express";
// use as npm package
import { currentUser } from "../../../common/src";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
