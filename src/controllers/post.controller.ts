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
    if(error instanceof Error) 
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
  }
};

const getPostById = async  (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(Number(id));

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.status(200).json({
      message: 'Post fetched successfully',
      payload: post,
    });
  } catch (error) {
    console.log(error);
    if(error instanceof Error) 
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
  }
};

export default {
  getPosts,
  getPostById,
};