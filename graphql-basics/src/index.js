import { GraphQLServer } from 'graphql-yoga';

// Create an Add query that returns a float
// Set up "add" to take a two arguments (a, b) which are required floats.
// Have the resolver send back the sum of the two arguments

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(a: Float!, b: Float!): Float!
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
        add(parent, args) {
            return args.a + args.b;
        },
        greeting(parent, args) {
            if (args.name && args.position) {
                return `Hello ${args.name}! Your are my favoriate ${args.position}.`;
            }
            return 'Hello!';
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
