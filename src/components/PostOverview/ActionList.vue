<script setup lang="ts">
defineProps<{
    hasActions?: boolean;
}>();
</script>

<template>
    <section class="content-box--shadow no-padding">
        <h2 class="title--actions"><slot name="title"></slot></h2>

        <div class="action-list">
            <slot name="placeholder" v-if="!hasActions"></slot>
            <ul
                v-if="hasActions"
                class="content-box--shadow content-box--border no-padding"
            >
                <slot name="actions"></slot>
            </ul>
        </div>
    </section>
</template>
