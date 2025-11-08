import axios from 'axios';

// Configuración de la API
const API_BASE_URL = 'https://fakestoreapi.com';
const USE_LOCAL_API = true; // Cambiar a false para usar FakeStore API

// Cache local para simulación
let productosCache = null;

/**
 * Obtener todos los productos
 * GET /products
 */
export const obtenerProductos = async () => {
  try {
    if (USE_LOCAL_API) {
      // Usar datos locales (productos.json)
      const response = await axios.get(`/productos.json?t=${Date.now()}`);
      productosCache = response.data;
      console.log('Productos cargados desde JSON local:', productosCache.length);
      return productosCache;
    } else {
      // Usar FakeStore API
      const response = await axios.get(`${API_BASE_URL}/products`);
      console.log('Productos cargados desde FakeStore API:', response.data.length);
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

/**
 * Crear un nuevo producto
 * POST /products
 */
export const crearProducto = async (producto) => {
  try {
    if (USE_LOCAL_API) {
      // Simulación local
      if (!productosCache) {
        await obtenerProductos();
      }
      const nuevoId = Math.max(...productosCache.map(p => p.id)) + 1;
      const nuevoProducto = { ...producto, id: nuevoId };
      productosCache.push(nuevoProducto);
      console.log('Producto creado (local):', nuevoProducto);
      return nuevoProducto;
    } else {
      // Usar FakeStore API
      const response = await axios.post(`${API_BASE_URL}/products`, producto);
      console.log('Producto creado (FakeStore API):', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

/**
 * Actualizar un producto existente
 * PUT /products/:id
 */
export const actualizarProducto = async (id, productoActualizado) => {
  try {
    if (USE_LOCAL_API) {
      // Simulación local
      if (!productosCache) {
        await obtenerProductos();
      }
      const index = productosCache.findIndex(p => p.id === id);
      if (index !== -1) {
        productosCache[index] = { ...productosCache[index], ...productoActualizado };
        console.log('Producto actualizado (local):', productosCache[index]);
        return productosCache[index];
      }
      throw new Error('Producto no encontrado');
    } else {
      // Usar FakeStore API
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, productoActualizado);
      console.log('Producto actualizado (FakeStore API):', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

/**
 * Eliminar un producto
 * DELETE /products/:id
 */
export const eliminarProducto = async (id) => {
  try {
    if (USE_LOCAL_API) {
      // Simulación local
      if (!productosCache) {
        await obtenerProductos();
      }
      const index = productosCache.findIndex(p => p.id === id);
      if (index !== -1) {
        const eliminado = productosCache.splice(index, 1)[0];
        console.log('Producto eliminado (local):', eliminado);
        return true;
      }
      throw new Error('Producto no encontrado');
    } else {
      // Usar FakeStore API
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
      console.log('Producto eliminado (FakeStore API):', response.data);
      return true;
    }
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

/**
 * Obtener un producto por ID
 * GET /products/:id
 */
export const obtenerProductoPorId = async (id) => {
  try {
    if (USE_LOCAL_API) {
      // Simulación local
      if (!productosCache) {
        await obtenerProductos();
      }
      return productosCache.find(p => p.id === id);
    } else {
      // Usar FakeStore API
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      console.log('Producto obtenido (FakeStore API):', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};
