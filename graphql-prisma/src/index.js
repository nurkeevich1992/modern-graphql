import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Author from './resolvers/Author';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Author,
        Post,
        Comment,
    },
    context: {
        db,
        pubsub,
        prisma,
    },
});

server.start(() => {
    console.log('server started');
});
