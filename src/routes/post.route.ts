import { Router } from 'express';
import { postController } from '../controllers';

const router = Router();

router.route('/post')
  .get(postController.getPosts);

export default router;