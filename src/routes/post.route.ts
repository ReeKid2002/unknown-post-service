import { Router } from 'express';
import { postController } from '../controllers';

const router = Router();

router.route('/post')
  .get(postController.getPosts)
  .post(postController.createPost);

router.route('/post/:id')
  .get(postController.getPostById);

router.route('/post/user/:id')
  .get(postController.getPostsByUserId);



export default router;