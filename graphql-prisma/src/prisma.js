import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'secretText',
    fragmentReplacements,
});

export { prisma as default };

// prisma.query prisma.mutation prisma subscription prisma.exists

// 1: Create new post
// 2: Fetch all of the info about the user (author)

// const createPostForUser = async (authorId, data) => {
//     const userExist = prisma.exists.User({
//         id: authorId,
//     });

//     if (!userExist) {
//         throw new Error('User not found');
//     }

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
//         '{ author { id name email posts { id title isPublished } } }'
//     );

//     return post.author;
// };

// createPostForUser('ck2r6k60e00a908622xzrjec5', {
//     title: 'Greate books to read',
//     body: 'The war of Art',
//     isPublished: true,
// })
//     .then(data => {
//         console.log(JSON.stringify(data, undefined, 2));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// prisma.exists
//     .Comment({
//         id: 'abc123',
//     })
//     .then(data => {
//         console.log(data);
//     });

// const updatePostForUser = async (postId, data) => {
//     const postExists = prisma.exists.Post({
//         id: postId,
//     });

//     if (!postExists) {
//         throw new Error('Post not found!');
//     }

//     const post = await prisma.mutation.updatePost(
//         {
//             where: { id: postId },
//             data,
//         },
//         '{ author { id name email posts { id title body isPublished } } }'
//     );

//     return post.author;
// };

// updatePostForUser('ck2sio0gu00g20862hlkcqzy1', {
//     isPublished: true,
// })
//     .then(user => {
//         console.log(JSON.stringify(user, undefined, 2));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });
