<template>
    <div class="modal-backdrop" @click.self="close">
        <div class="modal-window card">
            <slot/>
        </div>
    </div>
</template>

<script setup>
    import { defineEmits } from 'vue';

    const emit = defineEmits(['close']);


    function close(){
        emit('close');
    }
</script>

<style scoped>
    .modal-backdrop{
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, rgba(2,6,23,0.45), rgba(2,6,23,0.6));
        z-index: 2000;
    }
</style>