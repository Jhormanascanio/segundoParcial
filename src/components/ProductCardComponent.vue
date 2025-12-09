<template>
  <div class="card product-card h-100 shadow-sm">
    <img :src="producto.imagen" :alt="producto.nombre" class="card-img-top">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ producto.nombre }}</h5>
      <p class="card-text text-muted small">{{ producto.descripcion }}</p>
      <div class="mt-auto">
        <p class="text-primary fw-bold fs-5 mb-2">
          ${{ producto.precio.toLocaleString('es-CO') }}
        </p>
        <div class="d-flex gap-2">
          <button @click="verDetalle" class="btn btn-outline-primary btn-sm flex-grow-1">
            <i class="bi bi-eye"></i> Ver
          </button>
          <button @click="editar" class="btn btn-outline-warning btn-sm">
            <i class="bi bi-pencil"></i>
          </button>
          <button @click="eliminar" class="btn btn-outline-danger btn-sm">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  methods: {
    verDetalle() {
      this.$emit('ver-detalle', this.producto);
    },
    editar() {
      this.$emit('editar', this.producto);
    },
    eliminar() {
      this.$emit('eliminar', this.producto);
    }
  }
}
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

.card-img-top {
  height: 250px;
  object-fit: cover;
}
</style>
