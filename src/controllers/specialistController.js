const { response } = require("express");
const express = require("express");
const router = express.Router();
const crawlerAllImagesOfSpecialist = require("../utils/crawler");

const Specialist = require("../models/specialist");

router.post("/crawler-specialist/:faceName", async (req, res) => {
  const searchName = req.params.faceName;

  try {
    if (await Specialist.exists({ facebookName: searchName })) {
      return res.status(400).send({ error: "User already exists on database" });
    }
    const result = await Specialist.create({ facebookName: searchName });
    crawlerAllImagesOfSpecialist(result);
    return res.status(200).send({ result });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error" });
  }
});

router.get("/get-specialist/:faceName", async (req, res) => {
  const searchedName = req.params.faceName;

  try {
    const result = await Specialist.find({ facebookName: searchedName });
    return res.status(200).send({ result });

  } catch (err) {
    
    console.log(err);
    return res.status(400).send({ error: "Error " });
  }
});


module.exports = (app) => app.use("/specialist", router);
