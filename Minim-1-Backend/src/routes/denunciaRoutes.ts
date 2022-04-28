import express, { Request, Response } from "express";

import User from "../models/User";
import Denuncia from "../models/Denuncia";

async function getDenuncias(req: Request, res: Response): Promise<void> {
  const allDenuncias = await Denuncia.find().populate(
    "userDenunciat",
    "name age creationDate"
  );
  if (allDenuncias.length == 0) {
    res.status(404).send("Encara no hi ha denuncies!");
  } else {
    res.status(200).send(allDenuncias);
  }
}

async function getDenunciaByName(req: Request, res: Response): Promise<void> {
  const denunciaFound = await Denuncia.findOne({
    name: req.params.name,
  }).populate("userDenunciat", "name age creationDate");
  if (denunciaFound == null) {
    res.status(404).send("La denuncia no existeix!");
  } else {
    res.status(200).send(denunciaFound);
  }
}

async function addDenuncia(req: Request, res: Response): Promise<void> {
  const { name, delito, userDenunciat, creationDate } = req.body;
  console.log("DATA DE CREACIO: " + creationDate);
  const userFound = await User.findOne({
    name: userDenunciat,
  });
  const newDenuncia = new Denuncia({
    name: name,
    delito: delito,
    userDenunciat: userFound,
  });
  if (creationDate != null) newDenuncia.creationDate = creationDate;
  await newDenuncia.save();
  res.status(200).send("Denuncia afegida!");
}

async function updateDenuncia(req: Request, res: Response): Promise<void> {
  const denunciaToUpdate = await Denuncia.findOneAndUpdate(
    { name: req.params.nameDenuncia },
    req.body
  );
  if (denunciaToUpdate == null) {
    res.status(404).send("La denuncia no existeix!");
  } else {
    res.status(200).send("Updated!");
  }
}

async function deleteDenuncia(req: Request, res: Response): Promise<void> {
  const denunciaToDelete = await Denuncia.findOneAndDelete(
    { name: req.params.nameDenuncia },
    req.body
  );
  if (denunciaToDelete == null) {
    res.status(404).send("La denuncia no existeix!");
  } else {
    res.status(200).send("Eliminada!");
  }
}

let router = express.Router();

router.get("/", getDenuncias);
router.get("/:name", getDenunciaByName);
router.post("/", addDenuncia);
router.put("/:nameDenuncia", updateDenuncia);
router.delete("/:nameDenuncia", deleteDenuncia);

export default router;
