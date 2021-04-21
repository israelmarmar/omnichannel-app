import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RequestWithUser extends Request{
  userId?: string,
}

const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token: string = req.headers["x-access-token"] as string;
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
};

export default verifyToken;