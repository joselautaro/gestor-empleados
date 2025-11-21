<template>  
    <div class="card">
        <div style="display: flex; justify-content: space-between; gap: 8px; align-items: center;">
            <div>
                <strong>{{ empleado.nombre }} {{ empleado.apellido }}</strong>
                <div class="small">{{ empleado.puesto }} - {{ empleado.email }}</div>
            </div>
            <div style="text-align: right;">
                <div class="small" style="font-weight: 700;">{{ empleado.salario }}</div>
            </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px;">
            <button class="btn ghost" @click="$emit('editar', empleado.id)">
                Editar
            </button>
            <button class="btn"  @click="$emit('toggle', empleado.id)">
                {{ empleado.activo ? 'Desactivar' : 'Activar' }}
            </button>
            <button class="btn danger"  @click="$emit('eliminar', empleado.id)">
                Eliminar
            </button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        empleado: {type: Object, required: true}
    });

    const emit = defineEmits(['editar', 'eliminar', 'toggle']);
</script>

<style scoped>
    .card{
        padding: 12px;
        border-radius: 10px;
    }
    .btn.danger{
        background: var(--danger);
    }
</style>