import { GraphQLServer } from 'graphql-yoga';

// data

const posts = [
    {
        id: 11,
        title: 'Bishkek city',
        body: 'Raining in the city of Bishkek',
        isPublished: true,
        author: 1,
    },
    {
        id: 12,
        title: 'Astana city',
        body: 'Raining in the city of Astana',
        isPublished: true,
        author: 3,
    },
    {
        id: 13,
        title: 'Osh city',
        body: 'Raining in the city of Osh',
        isPublished: true,
        author: 2,
    },
    {
        id: 14,
        title: 'Almata city',
        body: 'Raining in the city of Almata',
        isPublished: true,
        author: 3,
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
        posts: [12, 14],
    },
    {
        id: 3,
        name: 'Emin Nurke',
        email: 'emin@example.com',
        age: 4,
        posts: [13],
    },
    {
        id: 4,
        name: 'Safia Nurke',
        email: 'safia@example.com',
    },
];

// schemas
const typeDefs = `
    type Query {
        authors(query: String): [Author]!
        posts(query: String): [Post]!
    }

    type Author {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post]
    }

    type Post {
        id: ID!
        title: String!
        body: String
        isPublished: Boolean
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
    },

    Post: {
        author(parent, args, ctx, info) {
            return authors.find(author => author.id === parent.author);
        },
    },

    Author: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id);
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
