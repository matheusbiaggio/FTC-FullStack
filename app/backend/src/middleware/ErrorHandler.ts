import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import GenerateErro from '../utils/GenerateErro';

const ErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof GenerateErro) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  return res.status(500).json({ message: 'Internal Error' });
};

export default ErrorHandler;
