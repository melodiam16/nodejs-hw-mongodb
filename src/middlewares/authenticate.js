import createHttpError from 'http-errors';
import SessionCollection from '../db/models/Session.js';
import UserCollection from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await UserCollection.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};

// import createHttpError from 'http-errors';

// import { findSession, findUser } from '../services/auth.js';

// export const authenticate = async (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     return next(createHttpError(401, 'Authorization header missing'));
//   }
//   const [bearer, token] = authHeader.split(' ');
//   if (bearer !== 'Bearer') {
//     return next(
//       createHttpError(401, 'Authorization header must be type Bearer'),
//     );
//   }

//   const session = await findSession({ accessToken: token });
//   if (!session) {
//     return next(createHttpError(401, 'Session not found'));
//   }

//   if (Date.now() > session.accessTokenValidUntil) {
//     return next(createHttpError(401, 'Access token expired'));
//   }

//   const user = await findUser({ _id: session.userId });
//   if (!user) {
//     return next(createHttpError(401, 'User not found'));
//   }
// };

// src/middlewares/authenticate.js
