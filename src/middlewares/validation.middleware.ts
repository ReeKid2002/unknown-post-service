import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

interface IRequestWithTokenAndUser extends Request {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
}

const validateUser = async (req: IRequestWithTokenAndUser, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if(!authorization) {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }

    const jwtToken = authorization.split(' ')[1];
    if(!jwtToken) {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }

    const response = await axios.post('http://localhost:5050/api/auth/validate', { // TODO: Move url to env
      token: jwtToken,
    });

    if(!response || !response.data) {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }

    req.token = response.data?.payload ?? '';
    next();
  } catch (error) {
    if(error instanceof Error)
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
  }
};

const getUserDetails =async (req: IRequestWithTokenAndUser, res: Response, next: NextFunction) => {
  try {
    const token = req.token;
    if(!token) {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }

    console.log(token);

    const response = await axios.get(`http://localhost:5050/api/auth/user/${token}`); // TODO: Move url to env
    if(!response || !response.data) {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }

    req.user = response.data?.payload ?? {};
    console.log(response);
    next();
  } catch (error) {
    if(error instanceof Error)
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
  }
};

export default {
  validateUser,
  getUserDetails,
};