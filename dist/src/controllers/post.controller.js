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
        console.log(error);
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
};
