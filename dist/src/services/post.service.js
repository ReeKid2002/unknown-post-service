"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const postClient = new client_1.PrismaClient().post;
const getPosts = () => {
    return postClient.findMany({
        where: {
            published: true,
            deleted: false,
        },
    });
};
const getPostById = (id) => {
    return postClient.findUnique({
        where: {
            id,
        },
    });
};
const getPostsByUserId = (userId) => {
    return postClient.findMany({
        where: {
            authorId: userId,
        },
    });
};
const createPost = (title, content, authorId) => {
    return postClient.create({
        data: {
            title,
            content,
            authorId,
            published: true,
        },
    });
};
const updatePost = (id, title, content) => {
    return postClient.update({
        where: {
            id,
        },
        data: {
            title,
            content,
        },
    });
};
const unpublishPost = (id) => {
    return postClient.update({
        where: {
            id,
        },
        data: {
            published: false,
        },
    });
};
const deletePost = (id) => {
    return postClient.update({
        where: {
            id,
        },
        data: {
            deleted: true,
        }
    });
};
exports.default = {
    getPosts,
    getPostById,
    getPostsByUserId,
    createPost,
    updatePost,
    unpublishPost,
    deletePost,
};
