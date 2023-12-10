import { ref } from 'vue';

export function useActionHistory() {
    const actionHistory = ref<Action[] | undefined>();

    /**
     * @param postsSnapshot - is an array of posts depicting the current history entry's state
     * @param currentPost - is an object of the post that triggered the history entry's creation
     * @param currentIndex - the starting index of the moved post
     * @param targetIndex - the target index of the moved post
     * @type {( postsSnapshot: Post[], currentPost: Post, currentIndex: number, targetIndex: number ) => void}
     */

    function addActionToHistory({
        postsSnapshot,
        currentPost,
        currentIndex,
        targetIndex,
    }: Action) {
        const action: Action = {
            postsSnapshot,
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
     * @returns [Posts] - is an array containing a snapshot of posts for the associated history entry's point in time, used to update the post list
     */

    function rewindHistory({ historyIndex }: { historyIndex: number }): Post[] {
        if (!actionHistory.value) return [];

        // make a reference to the posts snapshot for the current entry
        const postsSnapshotForIndex =
            actionHistory.value[historyIndex].postsSnapshot;

        // remove current entry and all previous from the history array
        actionHistory.value?.splice(0, historyIndex + 1);

        // return posts snapshot reference for updating the posts list
        return postsSnapshotForIndex;
    }

    return { actionHistory, addActionToHistory, rewindHistory };
}
