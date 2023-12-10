import { useFetch } from '@vueuse/core';

export const fetchPosts = async (
    url = 'https://jsonplaceholder.typicode.com/posts'
): Promise<Post[] | undefined> => {
    try {
        const { data } = await useFetch<string>(url);

        return JSON.parse(data.value || '');
    } catch (e) {
        console.error('Error fetching posts', e);
    }
};
