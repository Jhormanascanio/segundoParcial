<template>
  <div>
    <h2 class="mb-4">
      <i class="bi bi-speedometer2 me-2"></i>
      Dashboard Principal
    </h2>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card text-white bg-primary shadow">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="card-title text-uppercase">Total Productos</h6>
                <h2 class="fw-bold">{{ totalProductos }}</h2>
              </div>
              <i class="bi bi-bag-fill fs-1"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card text-white bg-success shadow">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="card-title text-uppercase">Categorías</h6>
                <h2 class="fw-bold">4</h2>
              </div>
              <i class="bi bi-tags-fill fs-1"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card text-white bg-info shadow">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="card-title text-uppercase">Géneros</h6>
                <h2 class="fw-bold">2</h2>
              </div>
              <i class="bi bi-people-fill fs-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-header bg-white">
            <h5 class="mb-0">
              <i class="bi bi-info-circle me-2"></i>
              Bienvenido a Fashion Store
            </h5>
          </div>
          <div class="card-body">
            <p>
              Sistema de gestión de productos para tienda de ropa. 
              Utiliza el menú lateral para navegar entre las diferentes secciones.
            </p>
            <ul>
              <li><strong>Productos:</strong> Gestiona el inventario de ropa (Crear, Editar, Eliminar)</li>
              <li><strong>Clientes:</strong> Administra la información de clientes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DashboardHome',
  data() {
    return {
      totalProductos: 0
    };
  },
  async mounted() {
    try {
      const response = await axios.get('/productos.json');
      this.totalProductos = response.data.length;
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }
}
</script>
