module.exports = async function(req, res, next) {
  if(!req.headers || req.headers.Authorization){
    return res.badRequest({error: 'authorization header kosong'});
  }
  const tokenParam = req.headers.authorization;
  const decodedToken = JWTService.verify(tokenParam);
  const user = await User.findOne({
    id: decodedToken.user
  });
  if(!user){
    return next({error: 'invalid credentials provided'});
  }
  req.user = user.id;
  next();
};