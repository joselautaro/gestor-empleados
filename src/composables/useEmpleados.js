import { reactive, computed, watch } from "vue";

const STORAGE_KEY = 'mi-gestor-empleados-v1';

function generarId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2.9)}`;
}

const state = reactive({
    empleados: [],
    filtro: '',
    seleccionado: null
});

function cargarDesdeStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            state.empleados = [
                {
                    id: generarId(),
                    nombre: 'Ana',
                    apellido: 'Pérez',
                    email: 'ana@empresa.com',
                    puesto: 'Diseñadora',
                    salario: 85000,
                    active: true
                },
                {
                    id: generarId(),
                    nombre: 'Luis',
                    apellido: 'Gómez',
                    email: 'luis@empresa.com',
                    puesto: 'Desarrollador',
                    salario: 85000,
                    active: true
                }
            ];
            guardarEnStorage();
            return;
        }
        state.empleados = JSON.parse(raw);
    } catch (e) {
        console.error('Error leyendo storage', e);
        state.empleados = [];
    }
}

function guardarEnStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.empleados));
    } catch (e) {
        console.log('Error guardando en storage', e);
    }
}

function crearEmpleado(payload) {
    const nuevo = {
        id: generarId(),
        nombre: payload.nombre,
        apellido: payload.apellido,
        email: payload.email,
        puesto: payload.puesto,
        salario: Number(payload.salario) || 0,
        activo: payload.activo ?? true
    };

    state.empleados.unshift(nuevo);

    guardarEnStorage();

    return nuevo;
}

function actualizarEmpleado(id, cambios){
    const idx = state.empleados.findIndex(e => e.id === id);

    if(idx === -1) return null;

    state.empleados[idx] = {...state.empleados[idx], ...cambios};

    guardarEnStorage();

    return state.empleados[idx];
}

function eliminarEmpleado(id){
    const idx = state.empleados.findIndex(e => e.id === id);

    if(idx === -1) return false;

    state.empleados.splice(idx, 1);

    guardarEnStorage();

    return true;
}

function obtenerEmpleado(id){
    return state.empleados.find(e => e.id === id) ?? null;
}

function seleccionarEmpleado(id){
    state.seleccionado = obtenerEmpleado(id);
}

function limpiarSeleccion(){
    state.seleccionado = null;
}

function toggleActivo(id){
    const emp = obtenerEmpleado(id);

    if(!emp) return;

    emp.activo = !emp.activo;

    guardarEnStorage();
}

const empleadosFiltrados = computed(() =>{
    if(!state.filtro) return state.empleados;

    const t = state.filtro.toLowerCase().trim();

    return state.empleados.filter(e => 
        `${e.nombre} ${e.apellido}`.toLowerCase().includes(t) ||
        (e.puesto || '').toLowerCase().includes(t) ||
        (e.email || '').toLowerCase().includes(t)
    );
});

const totalEmpleados = computed(() => state.empleados.length);

const activos = computed(() => state.empleados.filter(e => e.activo).length);

const inactivos = computed(() => totalEmpleados.value - activos.value);

cargarDesdeStorage();

watch(
    () => state.empleados,
    () => guardarEnStorage(),
    {deep: true}
);

export function useEmpleados(){
    return{
        state,
        crearEmpleado,
        actualizarEmpleado,
        eliminarEmpleado,
        obtenerEmpleado,
        seleccionarEmpleado,
        limpiarSeleccion,
        toggleActivo,
        empleadosFiltrados,
        totalEmpleados,
        activos,
        inactivos
    }
}



