type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type Action = {
    postOrder: number[];
    currentPost: Post;
    currentIndex: number;
    targetIndex: number;
};
