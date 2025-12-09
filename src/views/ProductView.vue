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
        <i class="bi bi-bag-fill me-2"></i>
        Gestión de Productos
      </h2>
      <button @click="mostrarModalCrear" class="btn btn-primary">
        <i class="bi bi-plus-circle me-2"></i>
        Nuevo Producto
      </button>
    </div>

    <!-- Filtros -->
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Categoría</label>
            <select v-model="filtros.categoria" class="form-select">
              <option value="">Todas</option>
              <option value="Oversize">Oversize</option>
              <option value="Pantalon">Pantalón</option>
              <option value="Saco">Saco</option>
              <option value="Tenis">Tenis</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Género</label>
            <select v-model="filtros.genero" class="form-select">
              <option value="">Todos</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Buscar</label>
            <input v-model="filtros.busqueda" type="text" class="form-control" placeholder="Nombre del producto">
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de productos -->
    <div class="alert alert-info mb-3">
      <i class="bi bi-info-circle me-2"></i>
      Mostrando {{ productosFiltrados.length }} de {{ productos.length }} productos
    </div>

    <div v-if="productosFiltrados.length > 0" class="row g-4">
      <div v-for="producto in productosFiltrados" :key="producto.id" class="col-md-4">
        <ProductCardComponent :producto="producto" @ver-detalle="verDetalle" @editar="editarProducto"
          @eliminar="confirmarEliminar" />
      </div>
    </div>

    <div v-else class="alert alert-info">
      <i class="bi bi-info-circle me-2"></i>
      No se encontraron productos con los filtros aplicados
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
            <button type="button" class="btn-close btn-close-white" @click="mostrarModalEliminar = false"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">¿Estás seguro de que deseas eliminar este producto?</p>
            <div v-if="productoAEliminar" class="mt-3 p-3 bg-light rounded">
              <strong>{{ productoAEliminar.nombre }}</strong><br>
              <small class="text-muted">Esta acción no se puede deshacer</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="mostrarModalEliminar = false" :disabled="cargando">
              <i class="bi bi-x-circle me-2"></i>
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="eliminarProductoConfirmado" :disabled="cargando">
              <span v-if="cargando" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else class="bi bi-trash-fill me-2"></i>
              {{ cargando ? 'Eliminando...' : 'Eliminar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear/Editar -->
    <div v-if="mostrarModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ modoEdicion ? 'Editar Producto' : 'Nuevo Producto' }}
            </h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarProducto">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Nombre *</label>
                  <input v-model="productoForm.nombre" type="text" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Precio *</label>
                  <input v-model.number="productoForm.precio" type="number" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Categoría *</label>
                  <select v-model="productoForm.categoria" class="form-select" required>
                    <option value="Oversize">Oversize</option>
                    <option value="Pantalon">Pantalón</option>
                    <option value="Saco">Saco</option>
                    <option value="Tenis">Tenis</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Género *</label>
                  <select v-model="productoForm.genero" class="form-select" required>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">Descripción *</label>
                  <textarea v-model="productoForm.descripcion" class="form-control" rows="3" required></textarea>
                </div>
                <div class="col-12">
                  <label class="form-label">URL de Imagen *</label>
                  <input v-model="productoForm.imagen" type="text" class="form-control" required>
                  <small class="text-muted">Ejemplo: /img/Hombre/oversize1.png</small>
                </div>
              </div>
              <div class="mt-3 d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-save me-2"></i>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Detalle -->
    <div v-if="mostrarModalDetalle" class="modal fade show d-block" tabindex="-1"
      style="background-color: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalle del Producto</h5>
            <button type="button" class="btn-close" @click="mostrarModalDetalle = false"></button>
          </div>
          <div class="modal-body">
            <div class="row" v-if="productoDetalle">
              <div class="col-md-6">
                <img :src="productoDetalle.imagen" class="img-fluid rounded" :alt="productoDetalle.nombre">
              </div>
              <div class="col-md-6">
                <h3>{{ productoDetalle.nombre }}</h3>
                <p class="text-muted">{{ productoDetalle.descripcion }}</p>
                <hr>
                <p><strong>Categoría:</strong> {{ productoDetalle.categoria }}</p>
                <p><strong>Género:</strong> {{ productoDetalle.genero }}</p>
                <p><strong>Precio:</strong> <span class="text-primary fs-4">${{
                  productoDetalle.precio.toLocaleString('es-CO') }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCardComponent from '../components/ProductCardComponent.vue';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/mockapi';

export default {
  name: 'ProductView',
  components: {
    ProductCardComponent
  },
  data() {
    return {
      productos: [],
      filtros: {
        categoria: '',
        genero: '',
        busqueda: ''
      },
      mostrarModal: false,
      mostrarModalDetalle: false,
      mostrarModalEliminar: false,
      modoEdicion: false,
      productoForm: {
        id: null,
        nombre: '',
        categoria: '',
        genero: '',
        precio: 0,
        imagen: '',
        descripcion: ''
      },
      productoDetalle: null,
      productoAEliminar: null,
      alerta: {
        mostrar: false,
        tipo: '',
        mensaje: ''
      },
      cargando: false
    };
  },
  computed: {
    productosFiltrados() {
      return this.productos.filter(p => {
        const matchCategoria = !this.filtros.categoria || p.categoria === this.filtros.categoria;
        const matchGenero = !this.filtros.genero || p.genero === this.filtros.genero;
        const matchBusqueda = !this.filtros.busqueda ||
          (p.nombre && p.nombre.toLowerCase().includes(this.filtros.busqueda.toLowerCase()));
        return matchCategoria && matchGenero && matchBusqueda;
      });
    }
  },
  async mounted() {
    await this.cargarProductos();
  },
  methods: {
    async cargarProductos() {
      try {
        this.cargando = true;
        const productosRaw = await obtenerProductos();
        // Mapear el id correctamente si MockAPI lo devuelve en otro campo
        this.productos = productosRaw.map(p => ({
          ...p,
          id: p.id || p.nombre // Usar id si existe, sino el campo que MockAPI usa como id
        }));
        console.log('Total productos cargados en componente:', this.productos.length);
        console.log('Primer producto:', this.productos[0]);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        this.mostrarAlerta('danger', 'Error al cargar los productos');
      } finally {
        this.cargando = false;
      }
    },
    mostrarModalCrear() {
      this.modoEdicion = false;
      this.productoForm = {
        id: null,
        nombre: '',
        categoria: '',
        genero: '',
        precio: 0,
        imagen: '',
        descripcion: ''
      };
      this.mostrarModal = true;
    },
    editarProducto(producto) {
      console.log('Editando producto:', producto);
      const productId = producto.id || producto.nombre;
      this.modoEdicion = true;
      this.productoForm = { ...producto, id: productId };
      this.mostrarModal = true;
    },
    async guardarProducto() {
      try {
        this.cargando = true;
        if (this.modoEdicion) {
          await actualizarProducto(this.productoForm.id, this.productoForm);
          this.mostrarAlerta('success', 'Producto actualizado exitosamente');
        } else {
          await crearProducto(this.productoForm);
          this.mostrarAlerta('success', 'Producto creado exitosamente');
        }
        await this.cargarProductos();
        this.cerrarModal();
      } catch (error) {
        console.error('Error al guardar producto:', error);
        this.mostrarAlerta('danger', 'Error al guardar el producto');
      } finally {
        this.cargando = false;
      }
    },
    confirmarEliminar(producto) {
      console.log('Confirmando eliminar producto completo:', JSON.stringify(producto, null, 2));
      console.log('Campos del producto:', Object.keys(producto));
      const productId = producto.id || producto.nombre;
      console.log('ID que se usará:', productId);
      this.productoAEliminar = { ...producto, id: productId };
      this.mostrarModalEliminar = true;
    },
    async eliminarProductoConfirmado() {
      try {
        this.cargando = true;
        console.log('Eliminando producto con ID:', this.productoAEliminar.id);
        await eliminarProducto(this.productoAEliminar.id);
        await this.cargarProductos();
        this.mostrarModalEliminar = false;
        this.productoAEliminar = null;
        this.mostrarAlerta('success', 'Producto eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        this.mostrarAlerta('danger', 'Error al eliminar el producto: ' + (error.message || 'Error desconocido'));
      } finally {
        this.cargando = false;
      }
    },
    verDetalle(producto) {
      this.productoDetalle = producto;
      this.mostrarModalDetalle = true;
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

      // Auto-ocultar después de 5 segundos
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
