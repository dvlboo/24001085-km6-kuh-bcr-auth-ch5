const { getTokenFromHeaders, extractToken } = require('../helper/auth')
const { profile } = require('../../server/services/auth')


exports.authMiddelware = (roles) => async (req, res, next) => {
  try {
    // get token form headers
    const token = getTokenFromHeaders(req?.headers)
  
    // extract token to get id user
    const extractedToken = extractToken(token)

    // get user detail by Id
    const user = await profile(extractedToken?.id)

    // validate roles
    if (!roles.includes(user?.roles)) {
      return next ({
        message : "Forbidden",
        statusCode : 403
      })
    }

    // push to request
    req.user = user

    next()
  } catch (error) {
    error.statusCode = 401
    next(error)
  }

}