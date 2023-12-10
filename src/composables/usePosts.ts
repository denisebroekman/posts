import { ref } from 'vue';

export function usePosts() {
    const posts = ref<Post[] | undefined>();

    /**
     * @param updatedPosts - is an array of posts used to update the list of posts on the client
     * @param max - is an optional number to limit the posts displayed to a maximum
     */
    function updatePosts({
        updatedPosts,
        max,
    }: {
        updatedPosts: Post[] | undefined;
        max?: number;
    }) {
        if (max) updatedPosts = updatedPosts?.slice(0, max);
        posts.value = updatedPosts;
    }

    /**
     * @param targetIndex - the index to which to move the current post
     * @param currentIndex - the starting index of the current post
     */
    function movePost({
        targetIndex,
        currentIndex,
    }: {
        targetIndex: number;
        currentIndex: number;
    }) {
        if (
            !posts.value ||
            targetIndex > posts.value.length - 1 ||
            targetIndex < 0
        )
            return;

        // create shallow copy for manipulation to avoid side effects
        const updatedPosts = posts.value.concat();

        // to move the post, an option is to splice once and just swap current and target indices,
        // but that wouldn't cover a future scenario where we might like to implement a drag event
        // where you can drop any element anywhere and the rest should update to match.
        // so to keep it flexible, splice twice with a slight time complexity penalty
        // which, considering our array size, is acceptable
        const [currentPost] = updatedPosts.splice(currentIndex, 1);
        updatedPosts.splice(targetIndex, 0, currentPost);

        updatePosts({ updatedPosts });
    }

    return { posts, updatePosts, movePost };
}
