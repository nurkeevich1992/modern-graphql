const Subscription = {
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            const post = db.posts.find(post => post.id === postId && post.isPublished);

            if (!post) {
                throw new Error('Could not find post or Post is not published');
            }

            return pubsub.asyncIterator(`comment ${postId}`);
        },
    },

    post: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('post');
        },
    },

    author: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('author');
        },
    },
};

export { Subscription as default };
