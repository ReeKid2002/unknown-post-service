"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.route('/post')
    .get(middlewares_1.validationMiddleware.validateUser, controllers_1.postController.getPosts)
    .post(middlewares_1.validationMiddleware.validateUser, middlewares_1.validationMiddleware.getUserDetails, controllers_1.postController.createPost);
router.route('/post/:id')
    .get(middlewares_1.validationMiddleware.validateUser, controllers_1.postController.getPostById)
    .put(middlewares_1.validationMiddleware.validateUser, middlewares_1.validationMiddleware.getUserDetails, controllers_1.postController.updatePost)
    .patch(middlewares_1.validationMiddleware.validateUser, middlewares_1.validationMiddleware.getUserDetails, controllers_1.postController.unpublishPost)
    .delete(middlewares_1.validationMiddleware.validateUser, middlewares_1.validationMiddleware.getUserDetails, controllers_1.postController.deletePost);
router.route('/post/user/:id')
    .get(middlewares_1.validationMiddleware.validateUser, middlewares_1.validationMiddleware.getUserDetails, controllers_1.postController.getPostsByUserId);
exports.default = router;
