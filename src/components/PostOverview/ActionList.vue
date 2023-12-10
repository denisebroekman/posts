<script setup lang="ts"></script>

<template>
    <section class="content-box--shadow no-padding">
        <h2 class="title--actions"><slot name="title"></slot></h2>
        <div class="action-list">
            <div class="content-box--shadow content-box--border no-padding">
                <slot name="actions"></slot>
            </div>
        </div>
    </section>
</template>
