import express from "express";

let router = express.Router();

router.get("/", (req, res) => res.status(200).send("API: /api/users"));

export default router;
