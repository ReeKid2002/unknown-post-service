"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.route('/post')
    .get(controllers_1.postController.getPosts)
    .post(controllers_1.postController.createPost);
router.route('/post/:id')
    .get(controllers_1.postController.getPostById);
router.route('/post/user/:id')
    .get(controllers_1.postController.getPostsByUserId);
exports.default = router;
