const appError = require("../../utils/appError");
const { ERROR } = require("../../utils/httpStatusText");

module.exports = (...roles) => {
  // console.log(roles)
  return (req, res, next) => {
    // req.currentUser.role
    // console.log(req.currentUser.role)
    if(!roles.includes(req.currentUser.role)) {
      return next(appError.create('this role is not authorized', 401 , ERROR))
    }
    next();
  }
}