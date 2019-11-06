import uuidv4 from 'uuid';

const Mutation = {
    createAuthor(parent, args, { db }, info) {
        // eslint-disable-next-line no-shadow
        const emailTaken = db.authors.some(author => author.email === args.data.email);

        if (emailTaken) {
            throw new Error('Email taken.');
        }

        const author = {
            id: uuidv4(),
            ...args.data,
        };

        db.authors.push(author);

        return author;
    },

    deleteAuthor(parent, args, { db }, info) {
        const authorIndex = db.authors.findIndex(author => author.id === args.id);

        if (authorIndex === -1) {
            throw new Error('Author not found!');
        }

        const deletedUsers = db.authors.splice(authorIndex, 1);
        db.comments = db.comments.filter(comment => comment.author !== args.id);
        db.posts = db.posts.filter(post => {
            const match = post.author === args.id;

            if (match) {
                db.comments = db.comments.filter(comment => comment.post !== post.id);
            }

            return !match;
        });

        return deletedUsers[0];
    },

    createPost(parent, args, { db }, info) {
        const authorExist = db.authors.some(author => author.id === args.data.author);

        if (!authorExist) {
            throw new Error('Author not found!');
        }

        const post = {
            id: uuidv4(),
            ...args.data,
        };

        db.posts.push(post);

        return post;
    },

    deletePost(parent, args, { db }, info) {
        const postIndex = db.posts.findIndex(post => post.id === args.id);

        if (postIndex === -1) {
            throw new Error('Post not found!');
        }

        const deletedPosts = db.posts.splice(postIndex, 1);

        db.comments = db.comments.filter(comment => {
            const match = comment.post === args.id;
            return !match;
        });

        return deletedPosts[0];
    },

    createComment(parent, args, { db }, info) {
        const authorExist = db.authors.some(author => author.id === args.data.author);
        const postExistAndPublished = db.posts.some(post => post.id === args.data.post && post.isPublished === true);

        if (!authorExist) {
            throw new Error('Unable to find author');
        } else if (!postExistAndPublished) {
            throw new Error('Unable to find post OR not be published');
        }

        const comment = {
            id: uuidv4(),
            ...args.data,
        };

        db.comments.push(comment);

        return comment;
    },

    deleteComment(parent, args, { db }, info) {
        const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

        if (commentIndex === -1) {
            throw new Error('Comment not found!');
        }

        const deletedComment = db.comments.splice(commentIndex, 1);

        return deletedComment[0];
    },
};

export { Mutation as default };
