import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import DashboardHome from '../views/DashboardHome.vue';
import ProductView from '../views/ProductView.vue';
import ClientesView from '../views/ClientesView.vue';
import UsuariosView from '../views/UsuariosView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: DashboardHome
      },
      {
        path: 'productos',
        name: 'Productos',
        component: ProductView
      },
      {
        path: 'usuarios',
        name: 'Usuarios',
        component: UsuariosView
      },
      {
        path: 'clientes',
        name: 'Clientes',
        component: ClientesView
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const sesion = localStorage.getItem('sesion');
  
  if (to.meta.requiresAuth && !sesion) {
    next('/login');
  } else if (to.path === '/login' && sesion) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
