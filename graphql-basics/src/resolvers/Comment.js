const Comment = {
    post(parent, args, { db }, info) {
        return db.posts.find(post => post.id === parent.post);
    },

    author(parent, args, { db }, info) {
        return db.authors.find(author => author.id === parent.author);
    },
};

export { Comment as default };
