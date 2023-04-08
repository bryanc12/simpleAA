const httpStatus = require('../constants/httpStatus.constant.js');

const cookieName = require('../configs/cookieName.config.js');

const authService = require('../services/auth.service.js');

const accessTokenUtil = require('../utils/accessToken.util.js');
const responseUtil = require('../utils/response.util.js');

function authorize(req, res, next) {
  const accessToken = req.cookies[cookieName.accessToken];
  
  if (!accessToken) {
    const refreshToken = req.cookies[cookieName.refreshToken];
    const refreshTokenExist = authService.refreshTokenExist(refreshToken);

    if (refreshTokenExist) {
      const newAccessToken = accessTokenUtil.generateAccessToken(refreshTokenExist.username);
      responseUtil.addCookie(res, cookieName.accessToken, newAccessToken, (1000 * 60 * 60));
      authorize(req, res, next);
    }

    res.status(httpStatus.UNAUTHORIZED);
    res.send({ message: 'Not logged in' });
    res.end();
    return
  }

  const verifiedAccessToken = accessTokenUtil.verifyAccessToken(accessToken);

  if (verifiedAccessToken) {
    Object.assign(req, verifiedAccessToken);
    next();
    return
  }

  Object.assign(req.cookies[cookieName.accessToken], undefined);
  authorize(req, res, next);
}

module.exports = { authorize };