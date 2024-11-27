const jwt = require('jsonwebtoken');
const { getJWTToken, verifyToken, verifyJWTToken, decodeToken } = require("../utils/jwt.helper");
const { jwtSecret } = require("../config");
const User = require("../models/user");



exports.Authauthenticate = async (req, res, next) => {
  const tokenHeader = req.headers.Authorization;
    if (!tokenHeader) return res.status(401).json({ message: 'Forbidden' });
    const bearer = tokenHeader.split(' ')[0]
    if (bearer === "Bearer") return res.status(403).json({ message: 'Forbidden' })
    const token = tokenHeader.split(' ')[1]
    if (!token) return res.status(403).json({ message: 'Forbidden' })
    
    const verified = jwt.verify(token)
    if (!verified) return res.status(403).json({ message: 'Unauthorized' })
    
    const user = await User.findOne({ id: verified.id })
    if (!user) return res.status(403).json({ message: 'Account not found' })
        
    req.user = user._id
    next()

//   jwt.verify(token, jwtSecret, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });
//     req.user = user;  // Attach user details to the request
//     next();
//   });
};

exports.Userauthenticate = async (req, res, next) => {
  const tokenHeader = req.headers.Authorization;
    if (!tokenHeader) return res.status(401).json({ message: 'Forbidden' });
    const bearer = tokenHeader.split(' ')[0]
    if (bearer === "Bearer") return res.status(403).json({ message: 'Forbidden' })
    const token = tokenHeader.split(' ')[1]
    if (!token) return res.status(403).json({ message: 'Forbidden' })
    
    const verified = jwt.verify(token)
    if (!verified) return res.status(403).json({ message: 'Unauthorized' })
    
    const user = await User.findOne({ id: verified.id })
    if (!user) return res.status(403).json({ message: 'Account not found' })
    
    if (verified.role !== 'user') return res.status(403).json({ message: 'Unauthorized' })
    
    req.user = user._id
    next()

//   jwt.verify(token, jwtSecret, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });
//     req.user = user;  // Attach user details to the request
//     next();
//   });
};

exports.Adminauthenticate = async (req, res, next) => {
  const tokenHeader = req.headers.Authorization;
    if (!tokenHeader) return res.status(401).json({ message: 'Forbidden' });
    const bearer = tokenHeader.split(' ')[0]
    if (bearer === "Bearer") return res.status(403).json({ message: 'Forbidden' })
    const token = tokenHeader.split(' ')[1]
    if (!token) return res.status(403).json({ message: 'Forbidden' })
    
    const verified = jwt.verify(token)
    if (!verified) return res.status(403).json({ message: 'Unauthorized' })
    
    const user = await User.findOne({ id: verified.id })
    if (!user) return res.status(403).json({ message: 'Account not found' })
    
    if (verified.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' })
    
    req.user = user._id
    next()

//   jwt.verify(token, jwtSecret, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });
//     req.user = user;  // Attach user details to the request
//     next();
//   });
};


