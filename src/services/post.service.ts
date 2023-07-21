import { PrismaClient } from '@prisma/client';

const postClient = new PrismaClient().post;

const getPosts = () => {
  return postClient.findMany();
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

export default {
  getPosts,
  getPostById,
  getPostsByUserId,
};