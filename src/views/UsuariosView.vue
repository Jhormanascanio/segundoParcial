<template>
    <div>
        <!-- Alerta -->
        <div v-if="alerta.mostrar" :class="['alert', `alert-${alerta.tipo}`, 'alert-dismissible', 'fade', 'show']"
            role="alert">
            <i class="bi me-2" :class="{
                'bi-check-circle-fill': alerta.tipo === 'success',
                'bi-exclamation-triangle-fill': alerta.tipo === 'warning',
                'bi-x-circle-fill': alerta.tipo === 'danger',
                'bi-info-circle-fill': alerta.tipo === 'info'
            }"></i>
            {{ alerta.mensaje }}
            <button type="button" class="btn-close" @click="cerrarAlerta"></button>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>
                <i class="bi bi-people-fill me-2"></i>
                Gestión de Usuarios
            </h2>
            <button @click="mostrarModalCrear" class="btn btn-primary">
                <i class="bi bi-plus-circle me-2"></i>
                Nuevo Usuario
            </button>
        </div>

        <!-- Filtros -->
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Buscar</label>
                        <input v-model="busqueda" type="text" class="form-control" placeholder="Nombre o usuario">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Rol</label>
                        <select v-model="filtroRol" class="form-select">
                            <option value="">Todos</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Empleado">Empleado</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabla de Usuarios -->
        <div class="card shadow">
            <div class="card-body">
                <div v-if="cargando" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                    <p class="mt-2">Cargando usuarios...</p>
                </div>

                <div v-else-if="usuariosFiltrados.length > 0" class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
                                <td>{{ usuario.id }}</td>
                                <td>
                                    <i class="bi bi-person-circle me-2 text-primary"></i>
                                    {{ usuario.nombre }}
                                </td>
                                <td>{{ usuario.username }}</td>
                                <td>{{ usuario.email }}</td>
                                <td>
                                    <span
                                        :class="['badge', usuario.rol === 'Administrador' ? 'bg-success' : 'bg-info']">
                                        {{ usuario.rol }}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <button @click="editarUsuario(usuario)" class="btn btn-sm btn-warning me-2"
                                        title="Editar">
                                        <i class="bi bi-pencil-fill"></i>
                                    </button>
                                    <button @click="confirmarEliminar(usuario)" class="btn btn-sm btn-danger"
                                        title="Eliminar">
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-else class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    No se encontraron usuarios
                </div>
            </div>
        </div>

        <!-- Modal Crear/Editar -->
        <div v-if="mostrarModal" class="modal fade show d-block" tabindex="-1"
            style="background-color: rgba(0,0,0,0.5)">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i :class="['bi', 'me-2', modoEdicion ? 'bi-pencil-square' : 'bi-person-plus-fill']"></i>
                            {{ modoEdicion ? 'Editar Usuario' : 'Nuevo Usuario' }}
                        </h5>
                        <button type="button" class="btn-close" @click="cerrarModal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="guardarUsuario">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Nombre Completo *</label>
                                    <input v-model="usuarioForm.nombre" type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Usuario *</label>
                                    <input v-model="usuarioForm.username" type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Contraseña *</label>
                                    <input v-model="usuarioForm.password" type="password" class="form-control" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email *</label>
                                    <input v-model="usuarioForm.email" type="email" class="form-control" required>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Rol *</label>
                                    <select v-model="usuarioForm.rol" class="form-select" required>
                                        <option value="">Selecciona un rol</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Empleado">Empleado</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mt-3 d-flex gap-2 justify-content-end">
                                <button type="button" class="btn btn-secondary" @click="cerrarModal"
                                    :disabled="cargando">
                                    Cancelar
                                </button>
                                <button type="submit" class="btn btn-primary" :disabled="cargando">
                                    <span v-if="cargando" class="spinner-border spinner-border-sm me-2"></span>
                                    <i v-else class="bi bi-save me-2"></i>
                                    {{ cargando ? 'Guardando...' : 'Guardar' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Eliminar -->
        <div v-if="mostrarModalEliminar" class="modal fade show d-block" tabindex="-1"
            style="background-color: rgba(0,0,0,0.5)">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">
                            <i class="bi bi-exclamation-triangle-fill me-2"></i>
                            Confirmar Eliminación
                        </h5>
                        <button type="button" class="btn-close btn-close-white"
                            @click="mostrarModalEliminar = false"></button>
                    </div>
                    <div class="modal-body">
                        <p class="mb-0">¿Estás seguro de que deseas eliminar este usuario?</p>
                        <div v-if="usuarioAEliminar" class="mt-3 p-3 bg-light rounded">
                            <strong>{{ usuarioAEliminar.nombre }}</strong><br>
                            <small class="text-muted">Usuario: {{ usuarioAEliminar.username }}</small><br>
                            <small class="text-muted">Esta acción no se puede deshacer</small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="mostrarModalEliminar = false"
                            :disabled="cargando">
                            <i class="bi bi-x-circle me-2"></i>
                            Cancelar
                        </button>
                        <button type="button" class="btn btn-danger" @click="eliminarUsuarioConfirmado"
                            :disabled="cargando">
                            <span v-if="cargando" class="spinner-border spinner-border-sm me-2"></span>
                            <i v-else class="bi bi-trash-fill me-2"></i>
                            {{ cargando ? 'Eliminando...' : 'Eliminar' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../services/mockapi';

export default {
    name: 'UsuariosView',
    data() {
        return {
            usuarios: [],
            busqueda: '',
            filtroRol: '',
            mostrarModal: false,
            mostrarModalEliminar: false,
            modoEdicion: false,
            usuarioForm: {
                id: null,
                nombre: '',
                username: '',
                password: '',
                email: '',
                rol: ''
            },
            usuarioAEliminar: null,
            alerta: {
                mostrar: false,
                tipo: '',
                mensaje: ''
            },
            cargando: false
        };
    },
    computed: {
        usuariosFiltrados() {
            return this.usuarios.filter(u => {
                const matchBusqueda = !this.busqueda ||
                    u.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                    u.username.toLowerCase().includes(this.busqueda.toLowerCase());
                const matchRol = !this.filtroRol || u.rol === this.filtroRol;
                return matchBusqueda && matchRol;
            });
        }
    },
    async mounted() {
        await this.cargarUsuarios();
    },
    methods: {
        async cargarUsuarios() {
            try {
                this.cargando = true;
                const usuariosRaw = await obtenerUsuarios();
                // Mapear el id correctamente si MockAPI lo devuelve en otro campo
                this.usuarios = usuariosRaw.map(u => ({
                    ...u,
                    id: u.id || u.nombre // Usar id si existe, sino el campo nombre que MockAPI usa como id
                }));
                console.log('Usuarios cargados:', this.usuarios);
                console.log('Primer usuario:', this.usuarios[0]);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
                this.mostrarAlerta('danger', 'Error al cargar los usuarios');
            } finally {
                this.cargando = false;
            }
        },
        mostrarModalCrear() {
            this.modoEdicion = false;
            this.usuarioForm = {
                id: null,
                nombre: '',
                username: '',
                password: '',
                email: '',
                rol: ''
            };
            this.mostrarModal = true;
        },
        editarUsuario(usuario) {
            console.log('Editando usuario:', usuario);
            // Intentar obtener el id de diferentes campos
            const userId = usuario.id || usuario.nombre;
            if (!usuario || !userId) {
                this.mostrarAlerta('danger', 'Error: Usuario sin ID');
                return;
            }
            this.modoEdicion = true;
            // Asegurar que el formulario tenga el id correcto
            this.usuarioForm = { ...usuario, id: userId };
            this.mostrarModal = true;
        },
        async guardarUsuario() {
            try {
                this.cargando = true;
                if (this.modoEdicion) {
                    console.log('Actualizando usuario con ID:', this.usuarioForm.id);
                    await actualizarUsuario(this.usuarioForm.id, this.usuarioForm);
                    this.mostrarAlerta('success', 'Usuario actualizado exitosamente');
                } else {
                    console.log('Creando nuevo usuario');
                    await crearUsuario(this.usuarioForm);
                    this.mostrarAlerta('success', 'Usuario creado exitosamente');
                }
                await this.cargarUsuarios();
                this.cerrarModal();
            } catch (error) {
                console.error('Error al guardar usuario:', error);
                this.mostrarAlerta('danger', 'Error al guardar el usuario: ' + (error.message || 'Error desconocido'));
            } finally {
                this.cargando = false;
            }
        },
        confirmarEliminar(usuario) {
            console.log('Eliminando usuario:', usuario);
            // Intentar obtener el id de diferentes campos
            const userId = usuario.id || usuario.nombre;
            if (!usuario || !userId) {
                this.mostrarAlerta('danger', 'Error: Usuario sin ID');
                return;
            }
            // Asegurar que el usuario tenga el id correcto
            this.usuarioAEliminar = { ...usuario, id: userId };
            this.mostrarModalEliminar = true;
        },
        async eliminarUsuarioConfirmado() {
            try {
                this.cargando = true;
                console.log('Eliminando usuario con ID:', this.usuarioAEliminar.id);
                await eliminarUsuario(this.usuarioAEliminar.id);
                await this.cargarUsuarios();
                this.mostrarModalEliminar = false;
                this.usuarioAEliminar = null;
                this.mostrarAlerta('success', 'Usuario eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
                this.mostrarAlerta('danger', 'Error al eliminar el usuario: ' + (error.message || 'Error desconocido'));
            } finally {
                this.cargando = false;
            }
        },
        cerrarModal() {
            this.mostrarModal = false;
        },
        mostrarAlerta(tipo, mensaje) {
            this.alerta = {
                mostrar: true,
                tipo: tipo,
                mensaje: mensaje
            };

            setTimeout(() => {
                this.alerta.mostrar = false;
            }, 5000);
        },
        cerrarAlerta() {
            this.alerta.mostrar = false;
        }
    }
}
</script>

<style scoped>
.table th {
    font-weight: 600;
}

.badge {
    padding: 0.5em 0.75em;
}
</style>
