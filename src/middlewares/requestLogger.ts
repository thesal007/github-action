import { Request, Response, NextFunction } from 'express';

const requestLoggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
  next();
};

export default requestLoggerMiddleware;
