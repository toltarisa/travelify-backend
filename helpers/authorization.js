function permit(...permittedRoles) {
  return (req, res, next) => {
    const { user } = req;

    if (user && permittedRoles.includes(user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      res
        .status(403)
        .json({ message: "You're not allowed to do this operation" }); // user is forbidden
    }
  };
}

module.exports = permit;
