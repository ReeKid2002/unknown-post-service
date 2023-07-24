import { PrismaClient } from '@prisma/client';

const postClient = new PrismaClient().post;

const getPosts = () => {
  return postClient.findMany({
    where: {
      published: true,
      deleted: false,
    },
  });
};

const getPostById = (id: number) => {
  return postClient.findUnique({
    where: {
      id,
    },
  });
};

const getPostsByUserId = (userId: number) => {
  return postClient.findMany({
    where: {
      authorId: userId,
    },
  });
};

const createPost = (title: string, content: string, authorId: number) => {
  return postClient.create({
    data: {
      title,
      content,
      authorId,
      published: true,
    },
  });
};

const updatePost = (id: number, title: string, content: string) => {
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

const unpublishPost = (id: number) => {
  return postClient.update({
    where: {
      id,
    },
    data: {
      published: false,
    },
  });
};

const deletePost = (id: number) => {
  return postClient.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    }
  });
};

export default {
  getPosts,
  getPostById,
  getPostsByUserId,
  createPost,
  updatePost,
  unpublishPost,
  deletePost,
};