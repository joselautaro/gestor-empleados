<template>
    <div class="modal-backdrop" @click.self="onCancel" role="dialog" aria-modal="true">
        <div class="modal-window card" @keydown.esc="onCancel":aria-label="title" tabindex="-1" ref="dialogRef">
            <header style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                <div>
                    <h3 style="margin: 0;">{{ title }}</h3>
                    <p class="small" style="margin: 4px 0 0 ;">{{ subtitle }}</p>
                </div>
                <button class="btn ghost" @click="onCancel" aria-label="cerrar">X</button>
            </header>
            <main style="margin-top: 12px;">
                <slot>
                    <p>
                        ¿Estás seguro de que queres eliminar este elemento?
                        Esta acción no se puede deshacer.
                    </p>
                </slot>
            </main>
            <footer style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px;">
                <button class="btn ghost" @click="onCancel">
                    {{ cancelText }}
                </button>
                <button class="btn danger" @click="onConfirm">
                    {{ confirmText }}
                </button>
            </footer>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const props = defineProps({
        title: {type: String, default: 'Confirmar eliminación'},
        subtitle: {type: String, default: ''},
        confirmText: {type: String, default: 'Eliminar'},
        cancelText: {type: String, default: 'Cancelar'}
    });

    const emit = defineEmits(['confirm', 'cancel']);

    const dialogRef = ref(null);

    onMounted(() =>{
        if(dialogRef.value && typeof dialogRef.value.focus === 'function'){
            dialogRef.value.focus();
        }
    })

    function onConfirm(){
        emit('confirm');
    }

    function onCancel(){
        emit('cancel');
    }
</script>

<style scoped>
    .modal-window{
        width: 520px;
        max-width: 95%;
        padding: 16px;
        border-radius: 12px;
    }
    .card{
        padding: 12px;
    }

    .small{
        font-size: 13px;
        color: var(--muted);
    }
</style>