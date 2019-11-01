import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
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
        add(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0;
            }

            // [1,5,10,2]
            return args.numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
        },

        greeting(parent, args) {
            if (args.name && args.position) {
                return `Hello ${args.name}! Your are my favoriate ${args.position}.`;
            }
            return 'Hello!';
        },

        grades(parent, args, ctx, info) {
            return [78, 54, 98, 67, 90];
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
