import { ref } from 'vue';

export function usePosts() {
    const allPosts = ref<Post[] | undefined>();

    /**
     * @param updatedPosts - is an array of posts used to update the allPosts ref
     */
    function updatePosts({
        updatedPosts,
    }: {
        updatedPosts: Post[] | undefined;
    }) {
        allPosts.value = updatedPosts;
    }

    /**
     * @param allPosts - is an array of the full list of posts
     * @param startIndex - is the starting index for the posts to show
     * @param endIndex - is the ending index for posts to show
     * @returns [Posts] - an array of posts
     */
    function showPosts({
        allPosts,
        startIndex,
        endIndex,
    }: {
        allPosts: Post[] | undefined;
        startIndex: number;
        endIndex: number;
    }): Post[] {
        return allPosts?.slice(startIndex, endIndex) || [];
    }

    /**
     * @param targetIndex - the index to which to move the current post
     * @param currentIndex - the starting index of the current post
     * @returns [number] - an array of ids used to sort the list of posts to display
     */
    function movePost({
        targetIndex,
        currentIndex,
    }: {
        targetIndex: number;
        currentIndex: number;
    }): number[] {
        if (
            !allPosts.value ||
            targetIndex > allPosts.value.length - 1 ||
            targetIndex < 0
        )
            return [];

        // create shallow copy for manipulation to avoid side effects
        const updatedPosts = allPosts.value.concat();

        // map over posts before altering to store array of ids for rewind
        const postOrder = updatedPosts.map(post => post.id) || [];

        // to move the post, an option is to splice once and just swap current and target indices,
        // but that wouldn't cover a future scenario where we might like to implement a drag event
        // where you can drop any element anywhere and the rest should update to match.
        // so to keep it flexible, splice twice with a slight time complexity penalty
        // which, considering our array size, is acceptable
        const [currentPost] = updatedPosts.splice(currentIndex, 1);
        updatedPosts.splice(targetIndex, 0, currentPost);

        updatePosts({ updatedPosts });

        return postOrder;
    }

    return { allPosts, updatePosts, movePost, showPosts };
}
