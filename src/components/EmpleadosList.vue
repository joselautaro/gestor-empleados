<template>

    <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h3 style="margin: 0;">Empleados</h3>
                <div class="small">
                    Total empleados: {{ totalEmpleados }}
                    Activos: {{ activos }}
                    Inactivos: {{ inactivos }}
                </div>
            </div>

            <div class="small">
                Resultados: {{ empleadosFiltrados.length }}
            </div>
        </div>
        <div style="margin-top: 12px;">
            <div class="list-grid">
                <EmpleadosCard
                    v-for="emp in empleadosFiltrados"
                    :key="emp.id"
                    :empleado="emp"
                    @editar="onEditar"
                    @eliminar="onSolicitarEliminar"
                    @toggle="onToggle"
                />
            </div>
        </div>
    </div>

</template>
<script setup>
    import EmpleadosCard from './EmpleadosCard.vue';
    import {useEmpleados} from '../composables/useEmpleados'

    const {
        empleadosFiltrados,
        totalEmpleados,
        activos,
        inactivos,
        seleccionarEmpleado,
        toggleActivo
    } = useEmpleados();

    const emit = defineEmits(['abrir-editar', 'solitar-eliminar']);

    function onEditar(id){
        seleccionarEmpleado(id);
        emit('abrir-editar');
    }

    function onSolicitarEliminar(id){
        const lista = empleadosFiltrados.value ?? [];

        const emp = lista.find(e => e.id === id);

        emit('solitar-eliminar',{
            id,
            nombre: emp ? `${emp.nombre} ${emp.apellido}`: ''
        });
    }

    function onToggle(){
        toggleActivo(id);
    }
</script>

<style scoped>
    .list-grid{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    @media(max-width: 900px){
        .list-grid{
            grid-template-columns: 1fr;
        }
    }
</style>