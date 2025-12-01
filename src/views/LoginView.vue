<template>
  <div class="login-container d-flex align-items-center justify-content-center">
    <div class="login-card card shadow-lg">
      <div class="card-body p-5">
        <div class="text-center mb-4">
          <img src="/img/imagen.png" alt="Logo Trópico Rebelde" class="logo-login mb-3">
          <h2 class="fw-bold">Trópico Rebelde</h2>
          <p class="text-muted">Inicia sesión para continuar</p>
        </div>

        <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          {{ error }}
          <button type="button" class="btn-close" @click="error = null"></button>
        </div>

        <form @submit.prevent="iniciarSesion">
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input v-model="credenciales.usuario" type="text" class="form-control" placeholder="Ingresa tu usuario"
                required>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label">Contraseña</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input v-model="credenciales.password" type="password" class="form-control"
                placeholder="Ingresa tu contraseña" required>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold" :disabled="cargando">
            <span v-if="cargando" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else class="bi bi-box-arrow-in-right me-2"></i>
            {{ cargando ? 'Validando...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <div class="mt-4 text-center">
          <small class="text-muted">
            <strong>Usuarios de prueba:</strong><br>
            admin / admin123<br>
            harol / harol123<br>
            jhorman / jhorman123
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validarCredenciales } from '../services/mockapi';

export default {
  name: 'LoginView',
  data() {
    return {
      credenciales: {
        usuario: '',
        password: ''
      },
      error: null,
      cargando: false
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        this.error = null;
        this.cargando = true;

        // Validar credenciales contra MockAPI
        const usuario = await validarCredenciales(
          this.credenciales.usuario,
          this.credenciales.password
        );

        if (usuario) {
          // Guardar sesión con token simulado
          const sesion = {
            id: usuario.id,
            nombre: usuario.nombre,
            username: usuario.username,
            email: usuario.email,
            rol: usuario.rol,
            token: `token_${usuario.id}_${Date.now()}` // Token simulado
          };

          localStorage.setItem('sesion', JSON.stringify(sesion));
          localStorage.setItem('token', sesion.token);
          
          console.log('✅ Sesión iniciada:', sesion);
          this.$router.push('/dashboard');
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      } catch (err) {
        this.error = 'Error al intentar iniciar sesión. Verifica tu conexión.';
        console.error('❌ Error en login:', err);
      } finally {
        this.cargando = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 100%;
  max-width: 450px;
  border-radius: 1rem;
  border: none;
}

.input-group-text {
  background-color: #f8f9fa;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
}

.logo-login {
  width: 120px;
  height: auto;
  object-fit: contain;
}
</style>
