const {body} = require('express-validator')
const validationSchem = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage("title is required")
      .isLength({min:2})
      .withMessage("title at least is 2 char"),
    body('price')
      .notEmpty()
      .withMessage("price is required")
  ]
}

module.exports = {
  validationSchem
}