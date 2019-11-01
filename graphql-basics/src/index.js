import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!';
        },
        name() {
            return 'Tilek Kadyrov';
        },
        location() {
            return 'Chicago';
        },
        bio() {
            return 'Im from Kyrgyzstan';
        },
    },
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => {
    console.log('The server is up!');
});
