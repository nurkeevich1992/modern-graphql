import { GraphQLServer } from 'graphql-yoga';

// +++++++++++ sample datas ++++++++++++++
const users = [
    {
        id: 1,
        name: 'Andrew',
        email: 'andrew@example.com',
        age: 28,
    },
    {
        id: 2,
        name: 'Sarah',
        email: 'sarah@example.com',
    },
    {
        id: 3,
        name: 'Mike',
        email: 'mike@example.com',
    },
];

const posts = [
    {
        id: 10,
        title: 'GraphQL 101',
        body: 'This is how to use GraphQL...',
        isPublished: true,
        author: 1,
    },
    {
        id: 2,
        title: 'GraphQL 201',
        body: 'This is the advanced GraphQL post...',
        isPublished: false,
        author: 1,
    },
    {
        id: 3,
        title: 'Programming Music',
        body: '',
        isPublished: true,
        author: 2,
    },
];

// +++++++++++++++++++++++++++++++++++

//  Schemas
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
        author: User!
    }
`;

// Resolvers
const resolvers = {
    Query: {
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

        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }

            return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()));
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

    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author);
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
