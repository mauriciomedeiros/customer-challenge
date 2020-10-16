import { Request, Response, NextFunction } from 'express';
import { TokenService } from '@src/services/use-cases/token-service';
import logger from '@src/config/logger';

export class AuthMiddleware {
  public static decodeToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const token = req.headers['x-token'];
    try {
      const data = TokenService.decode(token as string);
      res.locals.token = data;
      next();
    } catch (error) {
      logger.error(`Error to decode JWT`, error);
      res.status(401).send({ code: 401, message: 'Unauthorized' });
    }
  }
}
