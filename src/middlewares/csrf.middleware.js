const httpStatus = require("../constants/httpStatus.constant.js");

const cookieName = require("../configs/cookieName.config.js");

const csrfTokenUtil = require("../utils/csrfToken.util.js");
const responseUtil = require("../utils/response.util.js");

function csrf(path) {
    return function (req, res, next) {
        const { username } = req.body;
        const csrfTokenCookie = req.cookies[cookieName.csrfToken];
        const xCsrfToken = req.headers["X-CSRF-TOKEN"];

        if (!csrfTokenCookie) {
            res.status(httpStatus.FORBIDDEN);
            res.send({ message: "Missing CSRF token in cookie" });
            res.end();
            return;
        }

        if (!xCsrfToken) {
            res.status(httpStatus.FORBIDDEN);
            res.send({ message: "Missing CSRF token in header" });
            res.end();
            return;
        }

        if (csrfTokenCookie !== xCsrfToken) {
            res.status(httpStatus.FORBIDDEN);
            res.send({ message: "CSRF token mismatch" });
            res.end();
            return;
        }

        const verifiedCsrfToken =
            csrfTokenUtil.verifyCsrfToken(csrfTokenCookie);

        if (!verifiedCsrfToken) {
            res.status(httpStatus.FORBIDDEN);
            res.send({ message: "Invalid CSRF token" });
            res.end();
            return;
        }

        if (verifiedCsrfToken.username !== username) {
            res.status(httpStatus.FORBIDDEN);
            res.send({ message: "CSRF token username mismatch" });
            res.end();
            return;
        }

        if (!path || path == undefined) {
            path = req.originalUrl;
        }

        if (verifiedCsrfToken.path !== path) {
            res.status(httpStatus.FORBIDDEN);
            res.send({ message: "CSRF token path mismatch" });
            res.end();
            return;
        }

        responseUtil.removeCookie(res, cookieName.csrfToken);
        next();
        return;
    };
}

module.exports = csrf;
