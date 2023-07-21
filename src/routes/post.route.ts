import { Router } from 'express';
import { postController } from '../controllers';

const router = Router();

router.route('/post')
  .get(postController.getPosts);

router.route('/post/:id')
  .get(postController.getPostById);

export default router;