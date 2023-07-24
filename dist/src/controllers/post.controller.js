"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield services_1.postService.getPosts();
        res.status(200).json({
            message: 'All posts fetched successfully',
            payload: allPosts,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield services_1.postService.getPostById(Number(id));
        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }
        res.status(200).json({
            message: 'Post fetched successfully',
            payload: post,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
    }
});
const getPostsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { id: userId } = req.params;
        if (id !== Number(userId)) {
            return res.status(401).json({
                message: 'You are not authorized to view this user\'s posts',
            });
        }
        const posts = yield services_1.postService.getPostsByUserId(id);
        if (!posts) {
            return res.status(404).json({
                message: 'Posts not found',
            });
        }
        res.status(200).json({
            message: 'Posts fetched successfully',
            payload: posts,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const { id } = req.user;
        const post = yield services_1.postService.createPost(title, content, id);
        if (!post) {
            return res.status(500).json({
                message: 'Unable to create post',
            });
        }
        res.status(201).json({
            message: 'Post created successfully',
            payload: post,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const { id: userId } = req.user;
        const post = yield services_1.postService.getPostById(Number(id));
        if (!post) {
            return res.status(401).json({
                message: 'Post not found',
            });
        }
        if (post.authorId !== userId) {
            return res.status(401).json({
                message: 'You are not authorized to update this post',
            });
        }
        const updatedPost = yield services_1.postService.updatePost(Number(id), title, content);
        if (!updatedPost) {
            return res.status(400).json({
                message: 'Unable to update post',
            });
        }
        res.status(200).json({
            message: 'Post updated successfully',
            payload: updatedPost,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
    }
});
const unpublishPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const post = yield services_1.postService.getPostById(Number(id));
        if (!post) {
            return res.status(401).json({
                message: 'Post not found',
            });
        }
        if (post.authorId !== userId) {
            return res.status(401).json({
                message: 'You are not authorized to unpublish this post',
            });
        }
        const updatedPost = yield services_1.postService.unpublishPost(Number(id));
        if (!updatedPost) {
            return res.status(400).json({
                message: 'Unable to unpublish post',
            });
        }
        res.status(200).json({
            message: 'Post unpublished successfully',
            payload: updatedPost,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const post = yield services_1.postService.getPostById(Number(id));
        if (!post) {
            return res.status(401).json({
                message: 'Post not found',
            });
        }
        if (post.authorId !== userId) {
            return res.status(401).json({
                message: 'You are not authorized to delete this post',
            });
        }
        const deletedPost = yield services_1.postService.deletePost(Number(id));
        if (!deletedPost) {
            return res.status(400).json({
                message: 'Unable to delete post',
            });
        }
        res.status(200).json({
            message: 'Post deleted successfully',
            payload: deletedPost,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
    }
});
exports.default = {
    getPosts,
    getPostById,
    getPostsByUserId,
    createPost,
    updatePost,
    unpublishPost,
    deletePost,
};
