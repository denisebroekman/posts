import { ref } from 'vue';

export function useActionHistory() {
    const allPosts: Post[] = [];
    const actionHistory = ref<Action[] | undefined>();

    /**
     * @param posts -   is an array of posts used to populate the allPosts holder,
     *                  which is used as an immutable dictionary to use for sorting during rewind
     */
    function setPostsForHistory({ posts }: { posts: Post[] | undefined }) {
        if (!posts || posts.length === 0) return;

        allPosts.splice(0, posts.length, ...posts);
    }

    /**
     * @param postOrder - is an array of indexes depicting the current sort order
     * @param currentPost - is an object of the post that triggered the history entry's creation
     * @param currentIndex - the starting index of the moved post
     * @param targetIndex - the target index of the moved post
     * @type {( postOrder: number[], currentPost: Post, currentIndex: number, targetIndex: number ) => void}
     */
    function addActionToHistory({
        postOrder,
        currentPost,
        currentIndex,
        targetIndex,
    }: Action) {
        const action: Action = {
            postOrder,
            currentPost,
            currentIndex,
            targetIndex,
        };

        if (!actionHistory.value) {
            // history array is empty or undefined, so we can just push the current action as is
            actionHistory.value = [action];
        } else {
            // push current action to the top of the history array
            actionHistory.value.unshift(action);
        }
    }

    /**
     * @param historyIndex - is a number corresponding to the history entry needed
     * @returns [Posts] - is an array of posts ordered by the history entry's defined post order, used to update the post list
     */
    function rewindHistory({ historyIndex }: { historyIndex: number }): Post[] {
        if (!actionHistory.value) return [];

        const sortArray = actionHistory.value[historyIndex].postOrder;

        const posts = allPosts.concat(); // allPosts should not be mutated

        const orderedPostsForIndex = posts
            .filter(post => sortArray.includes(post.id))
            .sort((a, b) => {
                return sortArray.indexOf(a.id) - sortArray.indexOf(b.id);
            });

        // remove current entry and all previous from the history array
        actionHistory.value?.splice(0, historyIndex + 1);

        // return posts snapshot reference for updating the posts list
        return orderedPostsForIndex;
    }

    return {
        allPosts,
        actionHistory,
        addActionToHistory,
        rewindHistory,
        setPostsForHistory,
    };
}
