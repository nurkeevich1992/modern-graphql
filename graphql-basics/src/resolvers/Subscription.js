const Subscription = {
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            const post = db.posts.find(post => post.id === postId && post.isPublished);

            if (!post) {
                throw new Error('Could not find post');
            }

            return pubsub.asyncIterator(`comment ${postId}`);
        },
    },
};

export { Subscription as default };
