/**
 * Created by nuaimat on 10/24/16.
 */

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
    if (req.session && req.session.user) {
        console.log("AUTH: " + req.session.user);
        return next();
    } else
        return res.sendStatus(401);
};


module.exports = auth;