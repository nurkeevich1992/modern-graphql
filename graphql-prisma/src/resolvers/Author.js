import getUserId from '../utils/getUserId';

const Author = {
    posts: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { prisma }, info) {
            return prisma.query.posts({
                where: {
                    isPublished: true,
                    author: {
                        id: parent.id,
                    },
                },
            });
        },
    },

    email: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request, false);

            if (userId && userId === parent.id) {
                return parent.email;
            }
            return null;
        },
    },
};

export { Author as default };
