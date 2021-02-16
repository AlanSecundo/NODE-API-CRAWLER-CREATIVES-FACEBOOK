const yup = require('yup');

module.exports = yup.object().shape({
  images: yup.array().of(yup.object().required()),
})

