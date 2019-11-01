import { GraphQLServer } from 'graphql-yoga';

// Demo user data
const users = [
    {
        id: 1,
        name: 'Tilek',
        email: 'tilek@example.com',
        age: 28,
    },
    {
        id: 2,
        name: 'Bermet',
        email: 'bermet@example.com',
    },
    {
        id: 3,
        name: 'Emin',
        email: 'emin@example.com',
    },
    {
        id: 4,
        name: 'Safia',
        email: 'safia@example.com',
    },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users: [User!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        isPublished: Boolean!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            return users;
        },
        me() {
            return {
                id: '234asdad',
                name: 'Mike',
                email: 'mike@example.com',
            };
        },

        post() {
            return {
                id: '123sfsdf',
                title: 'Post Title',
                body: 'This is post body',
                isPublished: true,
            };
        },
    },
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => {
    // eslint-disable-next-line no-console
    console.log('The server is up!');
});
