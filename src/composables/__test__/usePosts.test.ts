import { expect, test, describe, beforeEach } from 'vitest';
import { usePosts } from '../usePosts';

const { posts, updatePosts, movePost } = usePosts();

const postsMock: Post[] = [
    {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 2,
        title: 'Post 2',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 3,
        title: 'Post 3',
        body: 'Lorem ipsum',
    },
];

const updatedPostsMock: Post[] = [
    {
        userId: 1,
        id: 3,
        title: 'Post 3',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 2,
        title: 'Post 2',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'Lorem ipsum',
    },
];

const movePostFirstSecondMock: Post[] = [
    {
        userId: 1,
        id: 2,
        title: 'Post 2',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 3,
        title: 'Post 3',
        body: 'Lorem ipsum',
    },
];
const movePostFirstThirdMock: Post[] = [
    {
        userId: 1,
        id: 2,
        title: 'Post 2',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 3,
        title: 'Post 3',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'Lorem ipsum',
    },
];

beforeEach(() => {
    posts.value = postsMock;
});

describe('usePosts', () => {
    test('updatePosts should update the posts ref', async () => {
        updatePosts({ updatedPosts: updatedPostsMock });

        expect(posts.value).toStrictEqual(updatedPostsMock);
    });
    test('updatePosts should limit the number of posts if a max is set', async () => {
        updatePosts({ updatedPosts: updatedPostsMock, max: 2 });

        expect(posts.value?.length).toBe(2);
    });
    test('movePost should move a post from first to second index', async () => {
        movePost({ currentIndex: 0, targetIndex: 1 });

        expect(posts.value).toStrictEqual(movePostFirstSecondMock);
    });
    test('movePost should move a post from first to third index', async () => {
        movePost({ currentIndex: 0, targetIndex: 2 });

        expect(posts.value).toStrictEqual(movePostFirstThirdMock);
    });
});
