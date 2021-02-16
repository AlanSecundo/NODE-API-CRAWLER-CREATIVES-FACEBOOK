const express = require("express");
const router = express.Router();
const validateDto = require("../middleware/validade-dto");

const Creative = require("../models/creatives");
const creativeDto = require("../dto/creative");
const { response } = require("express");

router.post(
  "/save-image-url",
  validateDto(creativeDto),
  async (request, response) => {
    try {
      let results = [];

      for (let image of request.body.images) {
        if (!(await Creative.exists({ url: image.url }))) {
          results.push(await Creative.create(image));
        }
      }

      return response.status(200).send({ results });
    } catch (err) {
      console.log(err);
      return response.status(400).send({ error: err });
    }
  }
);

router.get("/get-images", async (resquest, response) => {
  try {
    const images = await Creative.find();
    return response.status(200).send({ images });
  } catch (err) {
    return response.status(400).send({ error: "Error" });
  }
});

router.get("/get-image-by-url/:url", async (request, response) => {
  const url = request.params.url;

  try {
    const imageByUrl = await Creative.find({ url: url });
    return response.status(200).send({ imageByUrl });
  } catch (err) {
    return response.status(400).send({ error: "Error" });
  }
});

router.get("/get-creatives-by-specialist/:specialistId", async (req, res) => {
  const id = req.params.url;

  try {
    const result = await Creative.find().populate({
      path: 'specialist',
      match : {_id: id}
    });

    return res.status(200).send({ result });

  } catch (err) {
    console.log(err)
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = (app) => app.use("/creative", router);
