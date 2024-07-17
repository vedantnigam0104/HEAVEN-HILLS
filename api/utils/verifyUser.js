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


import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import dotenv from 'dotenv'
dotenv.config();

export const verifyToken = (req, res, next) => {

    console.log("Token : " , req.header('Authorization'))
    const token = req.header('Authorization')?.replace('Bearer ', '');

    console.log("In validateUser");

    if (token === null || token === undefined) { // Check explicitly for null or undefined
        return res.status(401).json({ message: 'Unauthorized user. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Log the decoded token
        req.user = decoded.id;
        
        next();
    } catch (error) {
        console.error("Error decoding token:", error);
        res.status(400).json({ message: 'Unauthorized user. Invalid token.' });
    }
};

export const updateUser = async (req, res, next) => {
    console.log("In update")
    console.log(req.user);
    console.log(req.params.id);

    if (req.user !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

// module.exports = verifyToken