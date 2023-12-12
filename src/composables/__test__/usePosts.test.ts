import { expect, test, describe, beforeEach } from 'vitest';
import { usePosts } from '../usePosts';

const { allPosts, updatePosts, movePost, showPosts } = usePosts();

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

const showPostsMock: Post[] = [
    {
        userId: 1,
        id: 1,
        title: 'Post 1',
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
    allPosts.value = postsMock;
});

describe('usePosts', () => {
    test('updatePosts should update the posts ref', async () => {
        updatePosts({ updatedPosts: updatedPostsMock });

        expect(allPosts.value).toStrictEqual(updatedPostsMock);
    });
    test('showPosts should show the expected posts and post amount', async () => {
        const postsToShow = showPosts({
            allPosts: allPosts.value,
            startIndex: 0,
            endIndex: 1,
        });

        expect(postsToShow.length).toBe(1);
        expect(postsToShow).toStrictEqual(showPostsMock);
    });
    test('movePost should move a post from first to second index', async () => {
        movePost({ currentIndex: 0, targetIndex: 1 });

        expect(allPosts.value).toStrictEqual(movePostFirstSecondMock);
    });
    test('movePost should move a post from first to third index', async () => {
        movePost({ currentIndex: 0, targetIndex: 2 });

        expect(allPosts.value).toStrictEqual(movePostFirstThirdMock);
    });
});
