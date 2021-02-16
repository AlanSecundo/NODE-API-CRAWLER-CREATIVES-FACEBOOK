
function validateDto(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: err });
    }
  }
}

module.exports = validateDto;