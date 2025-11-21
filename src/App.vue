
<template>
  <div class="container">
    <Header @abrir-nuevo="abrirNuevo"/>
    <EmpleadosList
      @abrir-editar="abrirEditar"
      @solicitar-eliminar="abrirConfirmEliminar"
    />

    <aside class="sidebar">
      <div class="card">
        <h4 style="margin: 0;">Resumen rápido</h4>
        <div class="small" style="margin-top: 8px;">
          Total empleados: <strong>{{ totalEmpleados }}</strong><br>
          Activos: <strong>{{activos}}</strong>
          Inactivos: <strong>{{ inactivos }}</strong>
        </div>
      </div>
    </aside>

    <Modal v-if="modalOpen" @close="cerrarModal">
      <EmpleadosForm
        :modo="modalModo"
        :empleado="empleadoSeleccionado"
        @created="onCreated"
        @updated="onUpdated"
        @cancel="cerrarModal"
      />
    </Modal>
    <ConfirmModal
      v-if="confirmOpen"
      :title="`Eliminar empleado`"
      :subtitle="confirmNombre ? `¿Eliminar a ${confirmNombre}?` : ''"
      confirmText="Si, eliminar"
      cancelText="Cancelar"
      @confirm="confirmarEliminar"
      @cancel="cerrarConfirm"
    >
      <p>Esta acción eliminará permanentemente al empleado seleccionado.
        ¿Desea continuar?
      </p>
    </ConfirmModal>
  </div>
  
</template>
  <script setup>
    import Header from './components/Header.vue'
    import ConfirmModal from './components/ConfirmModal.vue'
    import EmpleadosList from './components/EmpleadosList.vue'
    import EmpleadosForm from './components/EmpleadosForm.vue'
    import Modal from './components/Modal.vue'
    import { useEmpleados } from './composables/useEmpleados'
    import {ref, toRaw} from 'vue';

    const{
      state,
      limpiarSeleccion,
      eliminarEmpleado,
      totalEmpleados,
      activos,
      inactivos
    } = useEmpleados();

    const modalOpen = ref(false);

    const modalModo = ref('crear');

    const empleadoSeleccionado = ref(null);

    const confirmOpen = ref(false);

    const confirmId = ref(null);

    const confirmNombre = ref('');

    function abrirNuevo (){
      limpiarSeleccion();
      empleadoSeleccionado.value = null;
      modalModo.value = 'crear';
      modalOpen.value = true;
    }

    function abrirEditar(){
      empleadoSeleccionado.value =
      state.seleccionado
        ? structuredClone(toRaw(state.seleccionado))
        : null;
        modalModo.value = 'editar';
        modalOpen.value = true;
    }

    function cerrarModal(){
      modalOpen.value = false;
      limpiarSeleccion();
      empleadoSeleccionado.value = null;
    }

    function abrirConfirmEliminar({id, nombre}){
      confirmId.value = id;
      confirmNombre.value = nombre || '';
      confirmOpen.value = true;
    }

    function cerrarConfirm(){
      confirmOpen.value = false;
      confirmId.value = null;
      confirmNombre.value = '';
    }

    function confirmarEliminar(){
      if(!confirmId.value) return cerrarConfirm();

      const ok = eliminarEmpleado(confirmId.value);

      cerrarConfirm();
    }

    function onCreated(nuevo){
      modalOpen.value = false;
    }

    function onUpdated(actualizado){
      modalOpen.value = false;
    }




  </script>
