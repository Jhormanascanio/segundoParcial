import axios from 'axios';

// Configuración de MockAPI
const MOCKAPI_BASE_URL = 'https://691d0009d58e64bf0d34aae5.mockapi.io/api/v1';

// Cliente Axios configurado
const apiClient = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ========== PRODUCTOS ==========

/**
 * Obtener todos los productos
 * GET /products
 */
export const obtenerProductos = async () => {
  try {
    const response = await apiClient.get('/products');
    console.log('✅ Productos obtenidos:', response.data.length);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    throw error;
  }
};

/**
 * Obtener un producto por ID
 * GET /products/:id
 */
export const obtenerProductoPorId = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    console.log('✅ Producto obtenido:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener producto:', error);
    throw error;
  }
};

/**
 * Crear un nuevo producto
 * POST /products
 */
export const crearProducto = async (producto) => {
  try {
    const response = await apiClient.post('/products', producto);
    console.log('✅ Producto creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al crear producto:', error);
    throw error;
  }
};

/**
 * Actualizar un producto
 * PUT /products/:id
 */
export const actualizarProducto = async (id, producto) => {
  try {
    const response = await apiClient.put(`/products/${id}`, producto);
    console.log('✅ Producto actualizado:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    throw error;
  }
};

/**
 * Eliminar un producto
 * DELETE /products/:id
 */
export const eliminarProducto = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    console.log('✅ Producto eliminado:', id);
    return response.data;
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    throw error;
  }
};

// ========== USUARIOS ==========

/**
 * Obtener todos los usuarios
 * GET /users
 */
export const obtenerUsuarios = async () => {
  try {
    const response = await apiClient.get('/users');
    console.log('✅ Usuarios obtenidos:', response.data.length);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    throw error;
  }
};

/**
 * Obtener un usuario por ID
 * GET /users/:id
 */
export const obtenerUsuarioPorId = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    console.log('✅ Usuario obtenido:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener usuario:', error);
    throw error;
  }
};

/**
 * Crear un nuevo usuario
 * POST /users
 */
export const crearUsuario = async (usuario) => {
  try {
    const response = await apiClient.post('/users', usuario);
    console.log('✅ Usuario creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    throw error;
  }
};

/**
 * Actualizar un usuario
 * PUT /users/:id
 */
export const actualizarUsuario = async (id, usuario) => {
  try {
    const response = await apiClient.put(`/users/${id}`, usuario);
    console.log('✅ Usuario actualizado:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    throw error;
  }
};

/**
 * Eliminar un usuario
 * DELETE /users/:id
 */
export const eliminarUsuario = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    console.log('✅ Usuario eliminado:', id);
    return response.data;
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    throw error;
  }
};

/**
 * Validar credenciales de inicio de sesión
 * Busca un usuario por username y password
 */
export const validarCredenciales = async (username, password) => {
  try {
    const usuarios = await obtenerUsuarios();
    const usuario = usuarios.find(
      u => u.username === username && u.password === password
    );
    
    if (usuario) {
      console.log('✅ Login exitoso:', usuario.nombre);
      return usuario;
    } else {
      console.log('❌ Credenciales inválidas');
      return null;
    }
  } catch (error) {
    console.error('❌ Error al validar credenciales:', error);
    throw error;
  }
};
