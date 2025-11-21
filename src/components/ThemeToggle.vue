<template>

    <button class="btn ghost" @click="toggle">
        
        {{ mode === 'dark' ? 'Dark' : 'Light' }} mode
    </button>

</template>

<script setup>

    import {ref, onMounted} from 'vue';

    const THEME_KEY = "mi-gestor-theme-v1";

    const mode = ref('light');


    function aplicarModo(m){
        document.documentElement.setAttribute('data-theme', m === 'dark' ? 'dark' : 'light');

        mode.value = m;

        localStorage.setItem(THEME_KEY, m);
    }

    function toggle(){
        aplicarModo(mode.value === 'dark' ? 'light' : 'dark');
    }

    onMounted(() =>{
        const preferGuardado = localStorage.getItem(THEME_KEY);

        const preferSistema = 
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';

            const prefer = preferGuardado || preferSistema;

            aplicarModo(prefer);
    });

</script>

<style scoped>
    .btn{
        padding: 6px 10px;
        font-weight: 600;
    }
</style>