const Query = {
    authors(parent, args, { db }, info) {
        if (!args.query) {
            return db.authors;
        }

        return db.authors.filter(author => {
            const authorName = author.name.toLowerCase();
            const queryName = args.query.toLowerCase();
            return authorName.includes(queryName);
        });
    },

    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts;
        }

        return db.posts.filter(post => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());

            return isTitleMatch || isBodyMatch;
        });
    },

    comments(parent, args, { db }, info) {
        if (!args.query) {
            return db.comments;
        }

        return db.comments.filter(comment => comment.text.toLowerCase().includes(args.query.toLowerCase()));
    },
};

export { Query as default };
