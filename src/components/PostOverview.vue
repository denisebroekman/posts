<script setup lang="ts">
import { fetchPosts } from '@/utils/fetchPosts';
import { useActionHistory } from '@/composables/useActionHistory';
import { usePosts } from '@/composables/usePosts';

import PostItem from './PostOverview/PostItem.vue';
import ActionItem from './PostOverview/ActionItem.vue';
import ActionList from './PostOverview/ActionList.vue';
import ActionItemPlaceholder from './PostOverview/ActionItemPlaceholder.vue';

const { posts, updatePosts, movePost } = usePosts();
const { actionHistory, addActionToHistory, rewindHistory, setPostsForHistory } =
    useActionHistory();

const maxPosts = 5;
const hasActions = () => actionHistory.value && actionHistory.value.length > 0;

function handleMove({
    targetIndex,
    currentIndex,
}: {
    targetIndex: number;
    currentIndex: number;
}) {
    const postOrder = movePost({ targetIndex, currentIndex });

    if (!posts.value || posts.value.length === 0) return;

    addActionToHistory({
        postOrder,
        currentPost: posts.value[targetIndex],
        currentIndex,
        targetIndex,
    });
}

function handleRewind(historyIndex: number) {
    const updatedPosts = rewindHistory({
        historyIndex,
    });

    updatePosts({ updatedPosts, max: maxPosts });
}

await fetchPosts().then(posts => {
    setPostsForHistory({ posts });
    updatePosts({ updatedPosts: posts, max: maxPosts });
});
</script>

<template>
    <div class="wrapper">
        <section>
            <h2 class="title--posts">Sortable post list</h2>
            <ul class="post-list" v-auto-animate>
                <PostItem
                    v-for="(post, index) in posts"
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
