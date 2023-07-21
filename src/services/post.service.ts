import { PrismaClient } from '@prisma/client';

const postClient = new PrismaClient().post;

const getPosts = () => {
  return postClient.findMany();
};

export default {
  getPosts,
};