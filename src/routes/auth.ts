import express, { Request, Response } from "express";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    req.session.isLoggedIn = true;  // No TS error now, thanks to augmentation!
    res.json({ success: true, message: "Logged in" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Logout error");
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out" });
  });
});
export default router;
