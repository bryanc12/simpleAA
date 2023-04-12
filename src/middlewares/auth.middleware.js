const httpStatus = require('../constants/httpStatus.constant.js');

const cookieName = require('../configs/cookieName.config.js');

const authService = require('../services/auth.service.js');

const accessTokenUtil = require('../utils/accessToken.util.js');
const responseUtil = require('../utils/response.util.js');

function authorize(req, res, next) {
  const accessToken = req.cookies[cookieName.accessToken];
  
  // If the access token is not present
  if (!accessToken) {
    const refreshToken = req.cookies[cookieName.refreshToken];
    const refreshTokenExist = authService.refreshTokenExist(refreshToken);
    
    // If the refresh token is present
    if (refreshTokenExist) {
      // Generate a new access token and add it to the request object
      // And also add the new access token cookie to the response object
      // Then call the authorize function again
      const newAccessToken = accessTokenUtil.generateAccessToken(refreshTokenExist);
      req.cookies[cookieName.accessToken] = newAccessToken;
      responseUtil.addCookie(res, cookieName.accessToken, newAccessToken, (1000 * 60 * 60));
      authorize(req, res, next);
      return
    }

    // If the refresh token is not present
    // Then return an unauthorized response
    responseUtil.removeCookie(res, cookieName.refreshToken);
    res.status(httpStatus.UNAUTHORIZED);
    res.send({ message: 'Not logged in' });
    res.end();
    return
  }

  const verifiedAccessToken = accessTokenUtil.verifyAccessToken(accessToken);

  // If the access token is valid, then add the payloads to the request object
  if (verifiedAccessToken) {
    Object.assign(req, verifiedAccessToken);
    next();
    return
  }

  // If the access token is invalid, then remove the access token cookie and call the authorize function again
  req.cookies[cookieName.accessToken] = undefined;
  authorize(req, res, next);
  return
}

module.exports = { authorize };