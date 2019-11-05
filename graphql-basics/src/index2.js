import { GraphQLServer } from 'graphql-yoga';

// static datas

const comments = [
    {
        id: 21,
        text: 'its already stoppead raining in the bishkek city',
        author: 1,
    },
    {
        id: 22,
        text: 'but its still cold in in the bishkek',
        author: 4,
    },
    {
        id: 23,
        text: 'I think Elan Musk is more right the debate with jack ma',
        author: 1,
    },
    {
        id: 24,
        text: 'Amazon going to do very good deals on black friday',
        author: 3,
    },
    {
        id: 25,
        text: 'I will wait new year to buy something other then amazon',
        author: 3,
    },
    {
        id: 26,
        text: 'its already stoppead raining in the bishkek city',
        author: 2,
    },
];

const authors = [
    {
        id: 1,
        name: 'Tilekbek Kadyrov',
        email: 'tilekbek@example.com',
        age: 28,
        posts: [11],
    },
    {
        id: 2,
        name: 'Bermet Kalbotoeva',
        email: 'bermet@example.com',
        posts: [13, 14],
    },
    {
        id: 3,
        name: 'Emin Nurke',
        email: 'emin@example.com',
        age: 4,
        posts: [12],
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
        body: 'Its nice in the bishkek city',
        isPublished: true,
        author: 1,
        comments: [22, 24],
    },
    {
        id: 12,
        title: 'Lincoln Zoo',
        body: 'So many animals in in the zoo',
        author: 3,
        comments: [21],
    },
    {
        id: 13,
        title: 'Amazon',
        body: 'Its much cheaper if you buy something online',
        isPublished: true,
        author: 2,
        comments: [23, 25],
    },
    {
        id: 14,
        title: 'Elon Musk',
        body: 'Elon Musk is not agrees with Jack Ma over the IA',
        isPublished: true,
        author: 2,
        comments: [26],
    },
];

// schema
const typeDefs = `
    type Query {
        authors(query: String): [Author]!
        posts(query: String): [Post]!
        comments: [Comment]!
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
        id: ID,
        title: String!
        body: String!
        isPublished: Boolean
        author: Author!
        comments: [Comment]!
    }

    type Comment {
        id: ID!
        text: String!
        author: Author!
    }
`;

// resolvers
const resolvers = {
    Query: {
        // eslint-disable-next-line no-unused-vars
        authors(parent, args, ctx, info) {
            if (!args.query) {
                return authors;
            }

            return authors.filter(author => author.name.toLowerCase().includes(args.query.toLowerCase()));
        },
        // eslint-disable-next-line no-unused-vars
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
        // eslint-disable-next-line no-unused-vars
        comments(parent, args, ctx, info) {
            return comments;
        },
    },
    Post: {
        // eslint-disable-next-line no-unused-vars
        author(parent, args, ctx, info) {
            return authors.find(author => author.id === parent.author);
        },

        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.id === parent.comments);
        },
    },

    Author: {
        posts(parent, args, ctx, info) {
            return posts.find(post => post.author === parent.id);
        },

        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id);
        },
    },

    Comment: {
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
