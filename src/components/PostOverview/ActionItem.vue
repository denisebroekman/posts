<script setup lang="ts">
defineProps<{
    action: Action;
    historyIndex: number;
    onClick: (historyIndex: number) => void;
}>();
</script>

<template>
    <li class="action-item">
        Moved post {{ action.currentPost.id }} from index
        {{ action.currentIndex }} to index {{ action.targetIndex }}
        <button @click="onClick(historyIndex)">Time travel</button>
    </li>
</template>
