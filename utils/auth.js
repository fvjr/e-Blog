const withAuth = (req, res, next) => {
  //If not logged in, send user back to login route so that may log in
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

// const withAuth = (req, res, next) => {
//   //If not logged in, send user back to login route so that they may log in
//   //or req.session.logged_in === false
//   console.log(req.session);
//   if (req.session.user_name != true) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

module.exports = withAuth;
