import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId';

const Mutation = {
    async login(parent, { data }, { prisma }, info) {
        const user = await prisma.query.user({
            where: { email: data.email },
        });

        if (!user) {
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            throw new Error('Unable to login');
        }

        return {
            user,
            token: jwt.sign({ userId: user.id }, 'thisisasecret'),
        };
    },

    async createAuthor(parent, args, { prisma }, info) {
        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer');
        }

        const password = await bcrypt.hash(args.data.password, 10);

        const user = await prisma.mutation.createUser({
            data: { ...args.data, password },
        });

        return {
            user,
            token: jwt.sign({ userId: user.id }, 'thisisasecret'),
        };
    },

    async deleteAuthor(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        return prisma.mutation.deleteUser({ where: { id: userId } }, info);
    },

    async updateAuthor(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request);

        return prisma.mutation.updateUser(
            {
                where: { id: userId },
                data,
            },
            info
        );
    },

    async createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        return prisma.mutation.createPost(
            {
                data: {
                    ...args.data,
                    author: { connect: { id: userId } },
                },
            },
            info
        );
    },

    async deletePost(parent, { id }, { prisma, request }, info) {
        const userId = getUserId(request);
        const postExists = await prisma.exists.Post({
            id,
            author: {
                id: userId,
            },
        });

        if (!postExists) {
            throw new Error('Unable to delete post');
        }

        return prisma.mutation.deletePost({ where: { id } }, info);
    },

    async updatePost(parent, { id, data }, { prisma, request }, info) {
        const userId = getUserId(request);
        const postExists = await prisma.exists.Post({
            id,
            author: {
                id: userId,
            },
        });

        if (!postExists) {
            throw new Error('Unable to update post');
        }

        return prisma.mutation.updatePost(
            {
                where: { id },
                data,
            },
            info
        );
    },

    async createComment(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request);

        return prisma.mutation.createComment(
            {
                data: {
                    text: data.text,
                    post: { connect: { id: data.post } },
                    author: { connect: { id: userId } },
                },
            },
            info
        );
    },

    async deleteComment(parent, { id }, { prisma, request }, info) {
        const userId = getUserId(request);
        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userId,
            },
        });

        if (!commentExists) {
            throw new Error('Unable to delete comment');
        }

        return prisma.mutation.deleteComment({ where: { id } }, info);
    },

    async updateComment(parent, { id, data }, { prisma, request }, info) {
        const userId = getUserId(request);
        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userId,
            },
        });

        if (!commentExists) {
            throw new Error('Unable to update comment');
        }

        return prisma.mutation.updateComment({ where: { id }, data }, info);
    },
};

export { Mutation as default };
