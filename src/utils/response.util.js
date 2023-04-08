function addCookie(res, cookieName, cookieValue, cookieAge) {
    res.cookie(cookieName, cookieValue, {
        httpOnly: true,
        maxAge: cookieAge,
    })
}

function removeCookie(res, cookieName) {
    res.clearCookie(cookieName);
}

module.exports = {
    addCookie,
    removeCookie,
}