<template>
  <div class="sidebar bg-dark text-white vh-100 p-3">
    <h5 class="mb-4 text-center border-bottom pb-3">
      <i class="bi bi-list-ul me-2"></i>Menú
    </h5>
    <ul class="nav flex-column">
      <li class="nav-item mb-2">
        <router-link to="/dashboard" class="nav-link text-white" active-class="active">
          <i class="bi bi-speedometer2 me-2"></i>
          Dashboard
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link to="/dashboard/usuarios" class="nav-link text-white" active-class="active">
          <i class="bi bi-people-fill me-2"></i>
          Usuarios
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link to="/dashboard/productos" class="nav-link text-white" active-class="active">
          <i class="bi bi-bag-fill me-2"></i>
          Productos
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link to="/dashboard/clientes" class="nav-link text-white" active-class="active">
          <i class="bi bi-person-badge-fill me-2"></i>
          Clientes
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent'
}
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  min-width: 250px;
  max-width: 250px;
}

.nav-link {
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: #0d6efd;
}
</style>
