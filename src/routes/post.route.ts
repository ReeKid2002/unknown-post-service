import { Router } from 'express';
import { postController } from '../controllers';
import { validationMiddleware } from '../middlewares';

const router = Router();

router.route('/post')
  .get(validationMiddleware.validateUser, postController.getPosts)
  .post(validationMiddleware.validateUser, validationMiddleware.getUserDetails, postController.createPost);

router.route('/post/:id')
  .get(validationMiddleware.validateUser, postController.getPostById)
  .put(validationMiddleware.validateUser, validationMiddleware.getUserDetails, postController.updatePost)
  .patch(validationMiddleware.validateUser, validationMiddleware.getUserDetails, postController.unpublishPost)
  .delete(validationMiddleware.validateUser, validationMiddleware.getUserDetails, postController.deletePost);

router.route('/post/user/:id')
  .get(validationMiddleware.validateUser, validationMiddleware.getUserDetails, postController.getPostsByUserId);


export default router;