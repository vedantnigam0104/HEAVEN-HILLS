// import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log(token ,"--> In backend")

//   if (!token) return next(errorHandler(401, 'Unauthorized'));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, 'Forbidden'));

//     req.user = user;
//     next();
//   });
// };


const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    console.log("In validateUser");

    if (token === null || token === undefined) { // Check explicitly for null or undefined
        return res.status(401).json({ message: 'Unauthorized user. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Log the decoded token
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error("Error decoding token:", error);
        res.status(400).json({ message: 'Unauthorized user. Invalid token.' });
    }
};


module.exports = verifyUser;