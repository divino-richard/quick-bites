import { Request } from 'express';
import { User } from './types/user.types';

declare namespace Express {
  interface Request {
    userData?: User;
  }
}
