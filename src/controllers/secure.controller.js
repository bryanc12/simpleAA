const httpStatus = require('../constants/httpStatus.constant.js');

const cookieName = require('../configs/cookieName.config.js');

const accessTokenUtil = require('../utils/accessToken.util.js');
const csrfTokenUtil = require('../utils/csrfToken.util.js');
const responseUtil = require('../utils/response.util.js');

function csrf(req, res) {
    const accessToken = req.cookies[cookieName.accessToken];

    const verifiedAccessToken = accessTokenUtil.verifyAccessToken(accessToken);

    if (!verifiedAccessToken) {
        res.status(httpStatus.UNAUTHORIZED);
        res.end();
        return
    }

    const { path } = req.body;

    const csrfToken = csrfTokenUtil.generateCsrfToken(verifiedAccessToken.username, path);

    responseUtil.addCookie(res, cookieName.csrfToken, csrfToken, (1000 * 60 * 30));

    res.end()
}

module.exports = {
    csrf
};
