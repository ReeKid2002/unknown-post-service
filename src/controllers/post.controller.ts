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
    if(error instanceof Error) 
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
  }
};

interface IRequestWithUserData extends Request {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const getPostsByUserId = async (req: IRequestWithUserData, res: Response) => {
  try {
    const { id } = req.user;
    const posts = await postService.getPostsByUserId(id);
    if(!posts) {
      return res.status(404).json({
        message: 'Posts not found',
      });
    }
    res.status(200).json({
      message: 'Posts fetched successfully',
      payload: posts,
    });
  } catch (error) {
    if(error instanceof Error) 
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
  }
};

const createPost = async (req: IRequestWithUserData, res: Response) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const post = await postService.createPost(title, content, id);
    
    if(!post) {
      return res.status(500).json({
        message: 'Unable to create post',
      });
    }

    res.status(201).json({
      message: 'Post created successfully',
      payload: post,
    });
  } catch (error) {
    if(error instanceof Error)
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
  }
};

const updatePost = async (req: IRequestWithUserData, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;

    const post = await postService.getPostById(Number(id));
    if(!post) {
      return res.status(401).json({
        message: 'Post not found',
      });
    }

    if(post.authorId !== userId) {
      return res.status(401).json({
        message: 'You are not authorized to update this post',
      });
    }

    const updatedPost = await postService.updatePost(Number(id), title, content);
    if(!updatedPost) {
      return res.status(400).json({
        message: 'Unable to update post',
      });
    }

    res.status(200).json({
      message: 'Post updated successfully',
      payload: updatedPost,
    });
  } catch (error) {
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
  getPostsByUserId,
  createPost,
  updatePost,
};