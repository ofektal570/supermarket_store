import { Router, Request, Response } from "express";

const { Admins } = require("../../models/");
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const admins = await Admins.findOne({ where: { email, password } });

    return res.json(admins);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/add", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const admins = await Admins.create({ email, password });

    return res.json(admins);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

module.exports = router;
