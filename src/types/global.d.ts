type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type Action = {
    postsSnapshot: Post[];
    currentPost: Post;
    currentIndex: number;
    targetIndex: number;
};
