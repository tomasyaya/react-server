// this middleware will run before any private controller
// if there is no user in the session, meaning no logged in user, then it will fail and
// the request will not proceed.
function isLoggedIn(req, res, next) {
  console.log("req.session", req.session);
  const user = req.session.user;
  if (user) {
    return next();
  }
  res
    .status(400)
    .json({ message: "you need to be logged in to acces this resource" });
}

// this middleware will run before any anonymous controller
// if there is a user in the session, meaning a logged in user, then it will fail and
// the request will not proceed.
function isNotLoggedIn(req, res, next) {
  const user = req.session.user;
  if (!user) {
    return next();
  }
  res
    .status(400)
    .json({ message: "you need not to be logged in to acces this resource" });
}

module.exports = { isLoggedIn, isNotLoggedIn };
