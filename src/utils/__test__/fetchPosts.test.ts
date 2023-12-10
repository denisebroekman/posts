import { expect, test, describe, vi } from 'vitest';
import { fetchPosts } from '../fetchPosts';

const mockResponse: Post[] = [
    {
        userId: 1,
        id: 1,
        title: 'Post',
        body: 'Lorem ipsum',
    },
];

vi.mock('../fetchPosts');

describe('fetchPosts', () => {
    test('fetchPosts should resolve', async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts';

        vi.mocked(fetchPosts).mockReturnValue(
            new Promise(resolve => resolve(mockResponse))
        );

        const posts = await fetchPosts(url);

        expect(fetchPosts).toHaveBeenCalledWith(url);
        expect(posts).toStrictEqual(mockResponse);
    });
});
