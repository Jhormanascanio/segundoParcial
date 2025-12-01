<template>
  <div>
    <div class="d-flex align-items-center mb-4">
      <img src="/img/imagen.png" alt="Logo" class="logo-dashboard me-3">
      <h2 class="mb-0">
        <i class="bi bi-speedometer2 me-2"></i>
        Dashboard Principal
      </h2>
    </div>

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
                <h6 class="card-title text-uppercase">Total Usuarios</h6>
                <h2 class="fw-bold">{{ totalUsuarios }}</h2>
              </div>
              <i class="bi bi-people-fill fs-1"></i>
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
              <i class="bi bi-person-badge-fill fs-1"></i>
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
              Bienvenido a Trópico Rebelde
            </h5>
          </div>
          <div class="card-body">
            <p>
              Sistema de gestión de productos para tienda de ropa. 
              Oversize que rompe reglas. Utiliza el menú lateral para navegar entre las diferentes secciones.
            </p>
            <ul>
              <li><strong>Productos:</strong> Gestiona el inventario de ropa (Crear, Editar, Eliminar)</li>
              <li><strong>Usuarios:</strong> Administra la información de los usuarios del sistema (Crear, Editar, Eliminar)</li>
              <li><strong>Clientes:</strong> Administra la información de clientes (Próximamente)</li>
            </ul>
            <hr>
            <p class="mb-0 text-muted">
              <i class="bi bi-info-circle me-2"></i>
              Desarrollado por: Harol Camilo Melo Torrado & Jhorman Esneider Ascanio Tarazona
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerProductos, obtenerUsuarios } from '../services/mockapi';

export default {
  name: 'DashboardHome',
  data() {
    return {
      totalProductos: 0,
      totalUsuarios: 0
    };
  },
  async mounted() {
    try {
      // Cargar total de productos desde MockAPI
      const productos = await obtenerProductos();
      this.totalProductos = productos.length || 0;
      
      // Cargar total de usuarios desde MockAPI
      const usuarios = await obtenerUsuarios();
      this.totalUsuarios = usuarios.length || 0;
      
      console.log('📊 Dashboard actualizado - Productos:', this.totalProductos, 'Usuarios:', this.totalUsuarios);
    } catch (error) {
      console.error('❌ Error al cargar datos del dashboard:', error);
      this.totalProductos = 0;
      this.totalUsuarios = 0;
    }
  }
}
</script>

<style scoped>
.logo-dashboard {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.card {
  border: none;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
