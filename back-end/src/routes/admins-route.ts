// const { Router } = require("express");
import { Router } from "express";
const { Admins } = require("../../models/");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admins = await Admins.findOne({ where: { email, password } });

    return res.json(admins);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
