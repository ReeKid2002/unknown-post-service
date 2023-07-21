"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const postClient = new client_1.PrismaClient().post;
const getPosts = () => {
    return postClient.findMany();
};
exports.default = {
    getPosts,
};
