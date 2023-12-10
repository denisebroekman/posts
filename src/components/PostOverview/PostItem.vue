<script setup lang="ts">
const props = defineProps<{
    index: number;
    max: number;
    pulse: boolean;
    currentPosts: Post[] | undefined;
    onClick: ({
        targetIndex,
        currentIndex,
        currentPosts,
    }: {
        targetIndex: number;
        currentIndex: number;
        currentPosts: Post[] | undefined;
    }) => void;
}>();

const canMoveUp = () => props.index > 0;
const canMoveDown = () => props.index < props.max - 1;
</script>

<template>
    <article class="content-box--shadow">
        <div class="content-box__two-column">
            <slot name="title"></slot>
            <nav class="nav--post-order">
                <a
                    v-if="canMoveUp()"
                    href="#"
                    @click="
                        onClick({
                            currentIndex: index,
                            targetIndex: index - 1,
                            currentPosts,
                        })
                    "
                >
                    <font-awesome-icon
                        icon="fa-solid fa-chevron-up"
                        title="Move up"
                    />
                </a>
                <a
                    v-if="canMoveDown()"
                    href="#"
                    @click="
                        onClick({
                            currentIndex: index,
                            targetIndex: index + 1,
                            currentPosts,
                        })
                    "
                >
                    <i :class="{ pulse: pulse }">
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            title="Move down"
                        />
                    </i>
                </a>
            </nav>
        </div>
    </article>
</template>
