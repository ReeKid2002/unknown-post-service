import { Request, Response } from 'express';
import { postService } from '../services';

const getPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await postService.getPosts();
    res.status(200).json({
      message: 'All posts fetched successfully',
      payload: allPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
};

export default {
  getPosts,
};