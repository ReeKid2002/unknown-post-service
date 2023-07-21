import { Router } from 'express';
import { postController } from '../controllers';

const router = Router();

router.route('/post')
  .get(postController.getPosts)
  .post(postController.createPost);

router.route('/post/:id')
  .get(postController.getPostById)
  .put(postController.updatePost)
  .delete(postController.deletePost);

router.route('/post/user/:id')
  .get(postController.getPostsByUserId);


export default router;