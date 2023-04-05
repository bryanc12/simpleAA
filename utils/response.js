//a function to response with cookie
function responseWithCookie(res, cookieArray) {
    for (let i = 0; i < cookieArray.length; i++) {
        res.cookie(cookieArray[i].name, cookieArray[i].value, cookieArray[i].options);
    }
    res.send(data);
}