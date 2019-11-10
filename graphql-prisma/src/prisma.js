import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
});

// prisma.query prisma.mutation prisma subscription prisma.exists

// 1: Create new post
// 2: Fetch all of the info about the user (author)

// const createPostForUser = async (authorId, data) => {
//     const post = await prisma.mutation.createPost(
//         {
//             data: {
//                 ...data,
//                 author: {
//                     connect: {
//                         id: authorId,
//                     },
//                 },
//             },
//         },
//         '{ id }'
//     );
//     const user = await prisma.query.user(
//         {
//             where: {
//                 id: authorId,
//             },
//         },
//         '{ id name email posts { id title isPublished } }'
//     );

//     return user;
// };

// createPostForUser('ck2s92qd700380862hzwqqmzh', {
//     title: 'Greate books to read',
//     body: 'The war of Art',
//     isPublished: true,
// }).then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

const updatePostForUser = async (postId, data) => {};

// prisma.mutation
//     .updatePost(
//         {
//             data: {
//                 isPublished: true,
//             },
//             where: {
//                 id: 'ck2sio0gu00g20862hlkcqzy1',
//             },
//         },
//         '{ title isPublished }'
//     )
//     .then(data => {
//         console.log(data);
//         return prisma.query.posts(null, '{ id title isPublished }');
//     })
//     .then(data => {
//         console.log(JSON.stringify(data, undefined, 2));
//     });
