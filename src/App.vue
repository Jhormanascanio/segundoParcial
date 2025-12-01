<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

body {
  background-color: #f8f9fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Estilos globales para modales */
.modal {
  backdrop-filter: blur(2px);
}

/* Estilos globales para alertas */
.alert {
  border-radius: 0.5rem;
  border: none;
}

/* Estilos globales para botones */
.btn {
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Estilos para tablas */
.table {
  margin-bottom: 0;
}

.table thead th {
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    position: relative !important;
    height: auto !important;
    min-width: auto !important;
    max-width: 100% !important;
  }
  
  .d-flex.flex-column {
    flex-direction: column;
  }
}
</style>
