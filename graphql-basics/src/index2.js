/* eslint-disable no-unused-vars */
import { GraphQLServer } from 'graphql-yoga';

const authors = [
    {
        id: 1,
        name: 'Tilekbek Kadyrov',
        email: 'tilekbek@example.com',
        age: 28,
    },
    {
        id: 2,
        name: 'Bermet Kalbotoeva',
        email: 'bermet@example.com',
    },
    {
        id: 3,
        name: 'Emin Nurke',
        email: 'emin@example.com',
        age: 4,
    },
    {
        id: 4,
        name: 'Safia Nurke',
        email: 'safia@example.com',
    },
];

const posts = [
    {
        id: 11,
        title: 'Bishkek city',
        body: 'Its raining in the bishkek city',
        isPublished: true,
        author: 3,
    },
    {
        id: 12,
        title: 'Chimgen village',
        body: 'There is very small village in Leylek which is Chimgen',
        isPublished: false,
        author: 1,
    },
    {
        id: 13,
        title: 'Leyleks apples',
        body: 'we have very deliciouse apples in chimgen village',
        author: 2,
    },
    {
        id: 14,
        title: 'Amazon',
        body: 'Amazon planning to launch its own shipping and delivery service by 2020',
        isPublished: true,
        author: 1,
    },
    {
        id: 15,
        title: 'Donald Trump',
        body: 'US president Trump may leave the office very soon',
        isPublished: true,
        author: 4,
    },
    {
        id: 16,
        title: 'Cybertek',
        body: ' Many students graduating from Cybertek school and getting very high paid jobs',
        isPublished: true,
        author: 3,
    },
];

const comments = [
    {
        id: 21,
        text: 'Chimgen is actually is big',
        post: 12,
        author: 3,
    },
    {
        id: 22,
        text: 'Amazon services are very good',
        post: 11,
        author: 1,
    },
    {
        id: 23,
        text: 'You should try other then apples to in Chimgen',
        post: 15,
        author: 2,
    },
    {
        id: 24,
        text: 'its stopped actually now',
        post: 14,
        author: 4,
    },
    {
        id: 25,
        text: 'Trump may stay longer then you think',
        post: 16,
        author: 1,
    },
    {
        id: 26,
        text: 'I also graduated from Cybertek Chicago',
        post: 13,
        author: 3,
    },
];

// schemas
const typeDefs = `
    type Query {
        authors(query: String): [Author]! 
        posts(query: String): [Post]! 
        comments(query: String): [Comment]!
    }

    type Author {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post]!
        comments: [Comment]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        isPublished: Boolean
        author: Author!
        comments: [Comment]!
    }

    type Comment {
        id: ID!
        text: String!
        post: Post!
        author: Author!
    }
`;

// resolvers
const resolvers = {
    Query: {
        authors(parent, args, ctx, info) {
            if (!args.query) {
                return authors;
            }

            return authors.filter(author => {
                const authorName = author.name.toLowerCase();
                const queryName = args.query.toLowerCase();
                return authorName.includes(queryName);
            });
        },

        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts;
            }

            return posts.filter(post => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());

                return isTitleMatch || isBodyMatch;
            });
        },

        comments(parent, args, ctx, info) {
            if (!args.query) {
                return comments;
            }

            return comments.filter(comment => comment.text.toLowerCase().includes(args.query.toLowerCase()));
        },
    },

    Post: {
        author(parent, args, ctx, info) {
            return authors.find(author => author.id === parent.author);
        },

        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.post === parent.id);
        },
    },

    Author: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id);
        },

        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id);
        },
    },

    Comment: {
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post);
        },

        author(parent, args, ctx, info) {
            return authors.find(author => author.id === parent.author);
        },
    },
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => {
    // eslint-disable-next-line no-console
    console.log('server started');
});
