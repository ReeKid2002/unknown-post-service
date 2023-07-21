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

export default {
  getPosts,
  getPostById,
};