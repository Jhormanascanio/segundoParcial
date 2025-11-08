# 🛍️ Fashion Store - Tienda de Ropa

**Aplicación Web Modularizada con Vue.js 3 y Bootstrap 5.3**

## 👥 Equipo de Desarrollo

- **Harol Camilo Melo Torrado** - Código: 192471
- **Jhorman Esneider Ascanio Tarazona** - Código: 192534

## 📋 Descripción del Proyecto

Tropical Rebelde es una aplicación web moderna para la gestión de productos de una tienda de ropa. El sistema permite administrar un inventario de prendas organizadas por categorías (Oversize, Pantalones, Sacos, Tenis) y géneros (Hombre, Mujer), con un sistema de autenticación básico y una interfaz responsiva construida con Bootstrap 5.3.

### 🎯 Tipo de Negocio

Tienda de ropa que ofrece productos para hombre y mujer en las siguientes categorías:
- **Oversize**: Camisetas y prendas de corte holgado
- **Pantalones**: Jeans, cargo, formales y casuales
- **Sacos**: Chaquetas deportivas, de cuero y casuales
- **Tenis**: Calzado deportivo y casual

## 🏗️ Estructura del Proyecto

```
segundoParicial/
├── public/
│   ├── usuarios.json          # Base de datos local de usuarios
│   └── productos.json         # Base de datos local de productos
├── img/
│   ├── Hombre/               # Imágenes de productos masculinos
│   │   ├── oversize1-10.png
│   │   ├── pantalon1-10.png
│   │   └── saco1-10.png
│   ├── Mujer/                # Imágenes de productos femeninos
│   │   ├── oversize1-9.png
│   │   ├── pantalon1-9.png
│   │   └── saco1-10.png
│   └── tenishombre1-8.png    # Imágenes de tenis
│   └── tenismujer9.png
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── NavbarComponent.vue
│   │   ├── SidebarComponent.vue
│   │   ├── FooterComponent.vue
│   │   └── ProductCardComponent.vue
│   ├── views/                # Vistas principales
│   │   ├── LoginView.vue
│   │   ├── DashboardView.vue
│   │   ├── DashboardHome.vue
│   │   ├── ProductView.vue
│   │   └── ClientesView.vue
│   ├── router/               # Configuración de rutas
│   │   └── index.js
│   ├── services/             # Servicios de API
│   │   └── api.js
│   ├── App.vue               # Componente raíz
│   └── main.js               # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Tecnologías Utilizadas

- **Vue.js 3**: Framework progresivo de JavaScript
- **Vue Router 4**: Sistema de enrutamiento oficial de Vue
- **Bootstrap 5.3**: Framework CSS para diseño responsivo
- **Bootstrap Icons**: Iconografía
- **Axios**: Cliente HTTP para peticiones
- **Vite**: Build tool y servidor de desarrollo

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/HarolTorrado73/segundoParcial.git
cd segundoParcial
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 🔐 Sistema de Autenticación

### Usuarios de Prueba

El sistema utiliza validación local desde `public/usuarios.json`. **NOTA IMPORTANTE**: Este es un sistema educativo y NO representa autenticación real en producción.

| Usuario | Contraseña | Nombre |
|---------|-----------|--------|
| admin | admin123 | Administrador |
| harol | harol123 | Harol Camilo Melo Torrado |
| jhorman | jhorman123 | Jhorman Esneider Ascanio Tarazona |

### Flujo de Autenticación

1. Usuario ingresa credenciales en `LoginView`
2. Se valida contra `usuarios.json` usando Axios
3. Si es correcto, se guarda en `localStorage` y redirige a `/dashboard`
4. Si es incorrecto, se muestra alerta de Bootstrap con el error

## 🧩 Modularización y Componentes

### Componentes Reutilizables

#### 1. NavbarComponent.vue
- **Props**: `usuario` (String), `showLogout` (Boolean)
- **Eventos**: `@logout` - emitido al cerrar sesión
- **Funcionalidad**: Barra de navegación superior con logo, nombre de usuario y botón de salida

#### 2. SidebarComponent.vue
- **Props**: Ninguna
- **Funcionalidad**: Menú lateral persistente con enlaces a Dashboard, Productos y Clientes
- **Características**: Sticky positioning, active state con Vue Router

#### 3. FooterComponent.vue
- **Props**: Ninguna
- **Funcionalidad**: Pie de página con información de copyright y desarrolladores

#### 4. ProductCardComponent.vue
- **Props**: `producto` (Object)
- **Eventos**: 
  - `@ver-detalle` - muestra modal con información completa
  - `@editar` - abre formulario de edición
  - `@eliminar` - solicita confirmación y elimina
- **Funcionalidad**: Tarjeta individual de producto con imagen, precio y acciones

### Vistas Principales

#### LoginView.vue
Sistema de inicio de sesión con:
- Formulario reactivo (v-model)
- Validación con usuarios.json
- Alertas de Bootstrap para errores
- Redirección automática si ya está autenticado

#### DashboardView.vue
Layout principal que contiene:
- NavbarComponent en la parte superior
- SidebarComponent en lateral izquierdo
- `<router-view>` para vistas hijas
- FooterComponent en la parte inferior
- Verificación de autenticación en mounted()

#### DashboardHome.vue
Página de inicio del dashboard con:
- Tarjetas de estadísticas (total productos, categorías, géneros)
- Información de bienvenida
- Carga dinámica del total de productos

#### ProductView.vue
Gestión completa de productos:
- **Listado**: Grid responsivo con ProductCardComponent
- **Filtros**: Por categoría, género y búsqueda por nombre
- **Crear**: Modal con formulario completo
- **Editar**: Precarga datos en modal
- **Eliminar**: Confirmación antes de eliminar
- **Ver Detalle**: Modal con información ampliada

## 🌐 Consumo de API Externa (Simulada)

### Archivo: `src/services/api.js`

El proyecto implementa un servicio de API que simula operaciones CRUD:

```javascript
// Ejemplo de consumo desde ProductView.vue
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/api';

// Listar productos
const productos = await obtenerProductos();

// Crear producto
const nuevo = await crearProducto({ nombre: 'Oversize', precio: 45000, ... });

// Actualizar producto
await actualizarProducto(id, { nombre: 'Oversize Editado', ... });

// Eliminar producto
await eliminarProducto(id);
```

### Funcionamiento

1. **GET**: Lee `productos.json` con Axios y cachea en memoria
2. **POST**: Agrega al caché (en producción sería POST a API real)
3. **PUT**: Actualiza en caché (en producción sería PUT)
4. **DELETE**: Elimina del caché (en producción sería DELETE)

**NOTA**: En una aplicación real, estas funciones harían peticiones HTTP a un backend (ej: FakeStore API, MockAPI, JSON Server).

## 🎨 Diseño y Estilos

### Paleta de Colores

- **Primario**: Degradado púrpura (#667eea - #764ba2)
- **Secundario**: Gris oscuro (#343a40)
- **Fondo**: Gris claro (#f8f9fa)
- **Acentos**: Bootstrap primary, success, info, danger

### Características Visuales

- **Responsivo**: Grid system de Bootstrap
- **Animaciones**: Transiciones en hover (transform, box-shadow)
- **Iconografía**: Bootstrap Icons en todos los componentes
- **Sombras**: Efecto de profundidad en cards y modals
- **Tipografía**: Sans-serif system fonts

## 🔄 Comunicación entre Componentes

### Ejemplo 1: Props (Padre → Hijo)

```vue
<!-- DashboardView.vue (padre) -->
<NavbarComponent 
  :usuario="usuario" 
  :show-logout="true"
/>

<!-- NavbarComponent.vue (hijo) -->
<script>
export default {
  props: {
    usuario: String,
    showLogout: Boolean
  }
}
</script>
```

### Ejemplo 2: Eventos (Hijo → Padre)

```vue
<!-- ProductCardComponent.vue (hijo) -->
<button @click="$emit('eliminar', producto.id)">Eliminar</button>

<!-- ProductView.vue (padre) -->
<ProductCardComponent 
  @eliminar="confirmarEliminar"
/>

<script>
methods: {
  confirmarEliminar(id) {
    // Lógica de eliminación
  }
}
</script>
```

## 🛣️ Enrutamiento con Vue Router

### Configuración de Rutas

```javascript
// src/router/index.js
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: DashboardHome },
      { path: 'productos', component: ProductView },
      { path: 'clientes', component: ClientesView }
    ]
  }
];
```

### Guard de Navegación

```javascript
router.beforeEach((to, from, next) => {
  const usuario = localStorage.getItem('usuario');
  
  if (to.meta.requiresAuth && !usuario) {
    next('/login');  // Redirige a login si no está autenticado
  } else {
    next();
  }
});
```

## 📦 Gestión de Datos

### Datos (productos.json)

Cada producto contiene:
```json
{
  "id": 1,
  "nombre": "Oversize Clásico Negro",
  "categoria": "Oversize",
  "genero": "Hombre",
  "precio": 45000,
  "imagen": "/img/Hombre/oversize1.png",
  "descripcion": "Camiseta oversize de algodón 100%"
}
```

**Total de productos**: 27 (9 Hombre Ropa + 8 Tenis Hombre + 9 Mujer Ropa + 1 Tenis Mujer)  
**Categorías**: Oversize, Pantalón, Saco, Tenis

### Usuarios (usuarios.json)

```json
{
  "id": 1,
  "usuario": "admin",
  "password": "admin123",
  "nombre": "Administrador"
}
```

## 🔨 Buenas Prácticas Implementadas

1. **Componentización**: Separación lógica de UI en componentes reutilizables
2. **Organización de archivos**: Estructura clara por tipo (components, views, services)
3. **Nomenclatura**: PascalCase para componentes, camelCase para métodos
4. **Reactividad**: Uso correcto de data(), computed y methods
5. **Props y eventos**: Comunicación unidireccional de datos
6. **Servicios**: Lógica de API separada de componentes
7. **Guards**: Protección de rutas con autenticación
8. **Estilos scoped**: CSS aislado por componente

## 🎯 Funcionalidades Implementadas

✅ Sistema de login con validación  
✅ Dashboard con estadísticas  
✅ CRUD completo de productos  
✅ Filtros avanzados (categoría, género, búsqueda)  
✅ Modales para crear/editar/ver detalle  
✅ Componentes reutilizables con props y eventos  
✅ Ruteo con Vue Router y rutas anidadas  
✅ Guards de navegación  
✅ Diseño responsivo con Bootstrap  
✅ Persistencia en localStorage para sesión  

## 📸 Características Destacadas

- **Diseño moderno**: Interfaz limpia con degradados y animaciones
- **UX intuitiva**: Navegación clara y feedback visual
- **Código limpio**: Comentarios y estructura organizada
- **Responsive**: Funciona en móviles, tablets y desktop
- **Iconografía**: Íconos en todos los botones y secciones

## 🚧 Limitaciones y Mejoras Futuras

### Limitaciones Actuales

- Autenticación solo educativa (no segura para producción)
- Datos en memoria (se pierden al recargar)
- Sin backend real
- Sin validación de imágenes rotas

### Mejoras Sugeridas

- Implementar backend con Node.js/Express
- Base de datos MySQL o MongoDB
- Autenticación con JWT
- Upload de imágenes
- Paginación en listados
- Carrito de compras
- Sistema de ventas

## 📚 Referencias Utilizadas

- [Vue.js 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Bootstrap 5.3 Documentation](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Axios Documentation](https://axios-http.com/)

## 📝 Notas del Desarrollo

Este proyecto fue desarrollado como parte del segundo parcial de Desarrollo de Aplicaciones Web. Se enfocó en demostrar competencias en:

- Modularización de aplicaciones Vue.js
- Componentización y reutilización de código
- Consumo de APIs (simuladas)
- Diseño responsivo con Bootstrap
- Buenas prácticas de desarrollo

---

**Desarrollado por:**
- Harol Camilo Melo Torrado (192471)
- Jhorman Esneider Ascanio Tarazona (192534)

**Universidad**: UFPS  
**Fecha**: Noviembre 2025  
**Repositorio**: https://github.com/HarolTorrado73/segundoParcial
