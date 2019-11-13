import uuidv4 from 'uuid';

const Mutation = {
    async createAuthor(parent, args, { prisma }, info) {
        return prisma.mutation.createUser({ data: args.data }, info);
    },

    async deleteAuthor(parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
    },

    async updateAuthor(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updateUser({ where: { id }, data }, info);
    },

    async createPost(parent, args, { prisma }, info) {
        return prisma.mutation.createPost(
            {
                data: {
                    ...args.data,
                    author: {
                        connect: {
                            id: args.data.author,
                        },
                    },
                },
            },
            info
        );
    },

    async deletePost(parent, { id }, { prisma }, info) {
        return prisma.mutation.deletePost({ where: { id } }, info);
    },

    async updatePost(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updatePost(
            {
                where: { id },
                data,
            },
            info
        );
    },

    async createComment(parent, { data }, { prisma }, info) {
        return prisma.mutation.createComment(
            {
                data: {
                    text: data.text,
                    post: {
                        connect: {
                            id: data.post,
                        },
                    },
                    author: {
                        connect: {
                            id: data.author,
                        },
                    },
                },
            },
            info
        );
    },

    async deleteComment(parent, { id }, { prisma }, info) {
        return prisma.mutation.deleteComment({ where: { id } }, info);
    },

    async updateComment(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updateComment({ where: { id }, data }, info);
    },
};

export { Mutation as default };
