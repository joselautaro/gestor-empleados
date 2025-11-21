
<template>
  <div class="container">
    <Header/>
    <ConfirmModal>
      <p>Esta acción eliminará permanentemente al empleado seleccionado.
        ¿Desea continuar?
      </p>
    </ConfirmModal>
  </div>
  
</template>
  <script setup>
    import Header from './components/Header.vue'
    import ConfirmModal from './components/ConfirmModal.vue'
  </script>
