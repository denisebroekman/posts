<script setup lang="ts">
import { fetchPosts } from '@/utils/fetchPosts';
import { useActionHistory } from '@/composables/useActionHistory';
import { usePosts } from '@/composables/usePosts';

import PostItem from './PostOverview/PostItem.vue';
import ActionItem from './PostOverview/ActionItem.vue';
import ActionList from './PostOverview/ActionList.vue';
import ActionItemPlaceholder from './PostOverview/ActionItemPlaceholder.vue';

const { allPosts, updatePosts, showPosts, movePost } = usePosts();
const { actionHistory, addActionToHistory, rewindHistory } = useActionHistory();

const maxPosts = 5;
const hasActions = () => actionHistory.value && actionHistory.value.length > 0;
const postsToShow = showPosts({
    allPosts: allPosts.value,
    startIndex: 0,
    endIndex: maxPosts - 1,
});

function handleMove({
    targetIndex,
    currentIndex,
}: {
    targetIndex: number;
    currentIndex: number;
}) {
    const postOrder = movePost({ targetIndex, currentIndex });

    if (!allPosts.value || allPosts.value.length === 0) return;

    addActionToHistory({
        postOrder,
        currentPost: allPosts.value[targetIndex],
        currentIndex,
        targetIndex,
    });
}

function handleRewind(historyIndex: number) {
    const updatedPosts = rewindHistory({
        allPosts: allPosts.value || [],
        historyIndex,
    });

    updatePosts({ updatedPosts });
}

await fetchPosts().then(fetchedPosts => {
    updatePosts({ updatedPosts: fetchedPosts });
});
</script>

<template>
    <div class="wrapper">
        <section>
            <h2 class="title--posts">Sortable post list</h2>
            <ul class="post-list" v-auto-animate>
                <PostItem
                    v-for="(post, index) in postsToShow"
                    v-bind:key="post.id"
                    :index="index"
                    :pulse="!hasActions() && index === 0"
                    :max="maxPosts"
                    :onClick="handleMove"
                >
                    <template #title>Post {{ post.id }}</template>
                </PostItem>
            </ul>
        </section>
        <section>
            <ActionList>
                <template #title>List of actions committed</template>
                <template #actions>
                    <ActionItemPlaceholder v-if="!hasActions()" />
                    <ActionItem
                        v-for="(action, index) in actionHistory"
                        v-bind:key="index"
                        :action="action"
                        :historyIndex="index"
                        :onClick="handleRewind"
                    />
                </template>
            </ActionList>
        </section>
    </div>
</template>
