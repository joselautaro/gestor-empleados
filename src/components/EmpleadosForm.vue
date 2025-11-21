<template>
    <form class="card" @submit.prevent="onsubmit">
        <h3 style="margin-top: 0;">
            {{ modo === 'editar' ? 'Editar empleado' : 'Nuevo empleado' }}
        </h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <input type="text" placeholder="Nombre" required class="input" v-model="form.nombre">
            <input type="text" placeholder="Apellido" required class="input" v-model="form.apellido">
            <input type="email" placeholder="email" required class="input" v-model="form.email">
            <input type="text" placeholder="Puesto" required class="input" v-model="form.puesto">
        </div>
        <div style="display: flex; gap: 8px; align-items: center; margin-top: 8px;">
            <input type="number" placeholder="Salario" required class="input" v-model="form.salario">
            <label class="small" style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" v-model="form.activo"/>
                Activo
            </label>
        </div>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px;">
            <button type="button" class="btn ghost" @click="$emit('cancel')">
                Cancelar
            </button>
            <button type="submit" class="btn">
                {{ modo === 'editar' ? 'Guardar cambios' : 'Crear' }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { reactive, toRef, watch, computed } from 'vue';

import { useEmpleados } from '../composables/useEmpleados'

const props = defineProps({
    modo: { type: String, default: 'crear' },
    empleado: { type: Object, default: null }
})

const emit = defineEmits(['created', 'updated', 'cancel']);

const { crearEmpleado, actualizarEmpleado } = useEmpleados();

const form = reactive({
    nombre: '',
    apellido: '',
    email: '',
    puesto: '',
    salario: 0,
    activo: true
})

watch(
    () => props.empleado,
    (val) => {
        if (val) {
            form.nombre = val.nombre || '',
                form.apellido = val.apellido || '',
                form.email = val.email || '',
                form.puesto = val.puesto || '',
                form.salario = val.salario || 0,
                form.activo = val.activo ?? true;
        } else {
            Object.assign(form, {
                nombre: '',
                apellido: '',
                email: '',
                puesto: '',
                salario: 0,
                activo: true
            });
        }
    },
    {inmediate: true}
);

function onsubmit(){
    if(props.modo === 'editar' && props.empleado){
        const actualizado = actualizarEmpleado(props.empleado.id, {...form});
        emit('updated', actualizado);
    }else{
        const nuevo = crearEmpleado({...form});
        emit('created', nuevo)
        Object.assign(form, {
                nombre: '',
                apellido: '',
                email: '',
                puesto: '',
                salario: 0,
                activo: true
            });
    }
}

</script>

<style scoped>
    .card{
        padding: 12px;
    }

    .input{
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid rgba(15,23,42,0.06);
    }
</style>