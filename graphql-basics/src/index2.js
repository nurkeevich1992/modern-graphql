import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Author from './resolvers/Author';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Author,
        Post,
        Comment,
    },
    context: {
        db,
    },
});

server.start(() => {
    console.log('server started');
});
