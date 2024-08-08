const jwt = require('jsonwebtoken');
const { ERROR } = require('../../utils/httpStatusText');
const appError = require('../../utils/appError');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['Authorization'] || req.headers['authorization'];
  if(!authHeader) {
    const error = appError.create('token is required', 401, ERROR)
    return next(error)
  }
  const token = authHeader.split(' ')[1];       // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhvc3NhbUBnbWFpbC5jb20iLCJpZCI6IjY2YjM2NGNjMjc1MTIyMjZkMWUxMjU0ZiIsImlhdCI6MTcyMzA2MTU0NiwiZXhwIjoxNzIzMDYxNjA2fQ.W2pkRCleZwf-dRdI4KG34sAKmAeiWB8BrPbFwfseVfE
  // console.log("token ", token)
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
    // console.log('curcurrentUser : ',currentUser)
    req.currentUser = currentUser
    next();
  } catch (err) {
    const error = appError.create('invalid token', 401, ERROR)
    return next(error)
  }
  
}
module.exports = verifyToken;