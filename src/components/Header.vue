<template>
    <div class="header">
        <div style="display: flex; align-items: center; gap: 12px;">
            <h2 style="margin: 0;">Gestor de empleados</h2>
        </div>



        <div class="controls">
            <input type="text" class="input" v-model="state.filtro" placeholder="Buscar por nombre, puesto o email" />
            <button class="btn ghost" @click="$emit('abrir-nuevo')">
                Nuevo empleado
            </button>
            <ThemeToggle/>
        </div>
    </div>
</template>

<script setup>
    import {useEmpleados} from '../composables/useEmpleados';

    import ThemeToggle from './ThemeToggle.vue';

    const {state} = useEmpleados();

    const emit = defineEmits(['abrir-nuevo']);
</script>

<style scoped>
    .header{
        padding: 8px 0;
    }
</style>