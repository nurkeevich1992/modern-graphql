import { extractFragmentReplacements } from 'prisma-binding';
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import Author from './Author';
import Post from './Post';
import Comment from './Comment';

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Author,
    Post,
    Comment,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
