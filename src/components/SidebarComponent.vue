<template>
  <aside class="sidebar bg-dark text-white p-3">
    <h5 class="mb-4 text-center border-bottom pb-3">
      <i class="bi bi-list-ul me-2"></i>
      <span class="d-none d-md-inline">Menú</span>
    </h5>
    <nav class="nav flex-column">
      <router-link to="/dashboard" class="nav-link text-white" active-class="active">
        <i class="bi bi-speedometer2 me-2"></i>
        <span class="d-none d-md-inline">Dashboard</span>
      </router-link>
      
      <router-link to="/dashboard/usuarios" class="nav-link text-white" active-class="active">
        <i class="bi bi-people-fill me-2"></i>
        <span class="d-none d-md-inline">Usuarios</span>
      </router-link>
      
      <router-link to="/dashboard/productos" class="nav-link text-white" active-class="active">
        <i class="bi bi-bag-fill me-2"></i>
        <span class="d-none d-md-inline">Productos</span>
      </router-link>
      
      <router-link to="/dashboard/clientes" class="nav-link text-white" active-class="active">
        <i class="bi bi-person-badge-fill me-2"></i>
        <span class="d-none d-md-inline">Clientes</span>
      </router-link>
    </nav>
  </aside>
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
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.nav-link {
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.nav-link.active {
  background-color: #0d6efd;
  box-shadow: 0 4px 10px rgba(13, 110, 253, 0.3);
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .sidebar {
    position: relative;
    height: auto;
    min-width: auto;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  .nav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .nav-link {
    margin-bottom: 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
  
  h5 {
    display: none !important;
  }
}
</style>
