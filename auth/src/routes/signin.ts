import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  const { email, password } = req.body;
  res.send("Hello signin");
});

export { router as signIn };
