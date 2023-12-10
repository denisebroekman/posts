<script setup lang="ts">
import PostOverview from '@/components/PostOverview.vue';
</script>

<template>
    <main>
        <Suspense>
            <template #default>
                <PostOverview />
            </template>
            <template #fallback>
                <i class="loading"
                    ><font-awesome-icon
                        icon="fa-solid fa-spinner fa-pulse"
                        title="Loading"
                /></i>
            </template>
        </Suspense>
    </main>
</template>
