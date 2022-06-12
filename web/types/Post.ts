type Post = {
    data: {
        title: string,
        excerpt: string,
        likes: number
        creationDate: string,
        lastUpdate: string,
        isDraft: boolean
    };
    content: string;
}

export default Post;