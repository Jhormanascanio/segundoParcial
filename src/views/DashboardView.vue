<template>
  <div class="dashboard-container d-flex flex-column min-vh-100">
    <NavbarComponent :usuario="usuario" :show-logout="true" @logout="cerrarSesion" />

    <div class="d-flex flex-grow-1">
      <SidebarComponent />

      <main class="flex-grow-1 p-4 bg-light">
        <router-view />
      </main>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import SidebarComponent from '../components/SidebarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default {
  name: 'DashboardView',
  components: {
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  },
  data() {
    return {
      usuario: null
    };
  },
  mounted() {
    const sesionData = localStorage.getItem('sesion');
    if (sesionData) {
      const sesion = JSON.parse(sesionData);
      this.usuario = sesion.nombre;
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('sesion');
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  background-color: #f8f9fa;
}
</style>
