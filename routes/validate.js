const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  const headers = req.headers
  const token = req.header('auth-token')
  if (!token) {
    return res.send('ACCESS DENIED')
  }
  try {
    const verify_user = jwt.verify(token, process.env.TOKEN_SEC)
    next()
  } catch (err) {
    return res.send('ACCESS DENIED')
  }
}
