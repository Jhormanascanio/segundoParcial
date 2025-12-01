# Tropical Rebelde - Sistema de Gestión

> **Oversize que rompe reglas**

![Tropical Rebelde](public/imagen.png)

## 📋 Información del Proyecto

**Asignatura**: Construcción de una Aplicación Web Modularizada con Vue.js y Bootstrap 5.3  
**Evaluación**: Examen Final (Segundo Parcial)  
**Fecha de Entrega**: 15 días desde el inicio del examen

### 👥 Integrantes

- **Harol Camilo Melo Torrado** - Código: 192471
- **Jhorman Esneider Ascanio Tarazona** - Código: 192534

## 🎯 Descripción del Proyecto

Sistema web completo para la gestión de una tienda de ropa "Tropical Rebelde", que incluye:

- ✅ Gestión de Productos (CRUD completo)
- ✅ Gestión de Usuarios (CRUD completo)
- ✅ Sistema de Autenticación con MockAPI
- ✅ Modales Bootstrap para todas las operaciones
- ✅ Alertas de feedback al usuario
- ✅ Rutas protegidas con Navigation Guards
- ✅ Integración con MockAPI como base de datos externa

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Vue.js 3.3.4**: Framework JavaScript progresivo
- **Vue Router 4.2.5**: Enrutamiento y navegación
- **Bootstrap 5.3.2**: Framework CSS para diseño responsive
- **Bootstrap Icons**: Iconografía
- **Axios 1.6.0**: Cliente HTTP para APIs
- **Vite 4.5.0**: Build tool y dev server

### Backend

- **MockAPI**: Base de datos externa RESTful
- **API Base URL**: `https://691d0009d58e64bf0d34aae5.mockapi.io/api/v1/`

## 📁 Estructura del Proyecto

```
segundoParical/
├── public/
│   ├── img/
│   │   ├── Hombre/          # Imágenes productos masculinos
│   │   └── Mujer/           # Imágenes productos femeninos
│   ├── imagen.png           # Logo Tropical Rebelde
│   ├── productos.json       # Datos locales de productos
│   └── usuarios.json        # Datos locales de usuarios
├── scripts/
│   ├── crear-usuarios-iniciales.js   # Script migración usuarios
│   └── migrar-productos.js           # Script migración productos
├── src/
│   ├── components/
│   │   ├── FooterComponent.vue
│   │   ├── NavbarComponent.vue
│   │   ├── ProductCardComponent.vue
│   │   └── SidebarComponent.vue
│   ├── views/
│   │   ├── ClientesView.vue
│   │   ├── DashboardHome.vue
│   │   ├── DashboardView.vue
│   │   ├── LoginView.vue
│   │   ├── ProductView.vue
│   │   └── UsuariosView.vue
│   ├── services/
│   │   └── mockapi.js       # Servicio API MockAPI
│   ├── router/
│   │   └── index.js         # Configuración rutas
│   ├── App.vue
│   └── main.js
├── INSTRUCCIONES_MOCKAPI.md
├── guia.txt                 # Requerimientos del examen
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-repositorio>
cd segundoParical
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar MockAPI

**Importante**: Antes de ejecutar la aplicación, debes configurar MockAPI siguiendo las instrucciones detalladas en [INSTRUCCIONES_MOCKAPI.md](INSTRUCCIONES_MOCKAPI.md).

Resumen de pasos:

1. Acceder a https://mockapi.io/
2. Crear recurso "users" con schema de usuarios
3. Verificar recurso "products" existe
4. Ejecutar scripts de migración

### 4. Migrar Datos a MockAPI

```bash
# Crear usuarios iniciales
node scripts/crear-usuarios-iniciales.js

# Migrar productos
node scripts/migrar-productos.js
```

### 5. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## 👤 Usuarios Iniciales

Después de ejecutar el script de migración, estos usuarios estarán disponibles:

| Usuario | Contraseña | Rol           |
| ------- | ---------- | ------------- |
| admin   | admin123   | Administrador |
| harol   | harol123   | Administrador |
| jhorman | jhorman123 | Empleado      |

## 📦 Catálogo de Productos

El sistema incluye **46 productos** distribuidos en:

### Hombre (38 productos)

- 10 Oversize
- 10 Pantalones
- 10 Sacos
- 8 Tenis

### Mujer (29 productos)

- 9 Oversize
- 9 Pantalones
- 10 Sacos
- 1 Tenis

## 🎨 Características Principales

### 1. Sistema de Autenticación

- Login con validación en MockAPI
- Almacenamiento de sesión en localStorage
- Token de sesión simulado
- Protección de rutas con Navigation Guards
- Logout con limpieza de sesión

### 2. Gestión de Productos

- ✅ **Listar**: Grid responsive con tarjetas
- ✅ **Crear**: Modal con formulario completo
- ✅ **Editar**: Modal pre-llenado con datos
- ✅ **Eliminar**: Modal de confirmación
- ✅ **Ver Detalle**: Modal informativo
- ✅ **Filtros**: Por categoría, género y búsqueda
- ✅ **Alertas**: Feedback visual de operaciones

### 3. Gestión de Usuarios

- ✅ **Listar**: Tabla responsive con información
- ✅ **Crear**: Modal con validación
- ✅ **Editar**: Modal con datos pre-cargados
- ✅ **Eliminar**: Modal de confirmación
- ✅ **Filtros**: Por rol y búsqueda
- ✅ **Badges**: Visualización de roles

### 4. Interfaz de Usuario

- 📱 **Responsive**: Adaptable a todos los dispositivos
- 🎨 **Bootstrap 5.3**: Diseño moderno y consistente
- 🔔 **Alertas**: Feedback inmediato de acciones
- 🪟 **Modales**: Interacción fluida sin cambiar de página
- 🎯 **Iconos**: Bootstrap Icons para mejor UX
- ⚡ **Loading States**: Spinners durante operaciones

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Build
npm run build        # Genera build de producción
npm run preview      # Previsualiza build de producción

# Migración
node scripts/crear-usuarios-iniciales.js   # Crea usuarios en MockAPI
node scripts/migrar-productos.js           # Migra productos a MockAPI
```

## 📡 API Endpoints

### Productos

- `GET /products` - Listar todos los productos
- `GET /products/:id` - Obtener un producto
- `POST /products` - Crear producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

### Usuarios

- `GET /users` - Listar todos los usuarios
- `GET /users/:id` - Obtener un usuario
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

## 🎓 Cumplimiento de Requerimientos

### Requerimientos Funcionales ✅

1. ✅ **Autenticación**: Login con MockAPI, manejo de sesiones
2. ✅ **CRUD Productos**: Todas las operaciones implementadas
3. ✅ **CRUD Usuarios**: Todas las operaciones implementadas
4. ✅ **Modales**: Bootstrap modals para crear, editar, eliminar
5. ✅ **Alertas**: Sistema de alertas con tipos (success, danger, info)
6. ✅ **Rutas Protegidas**: Navigation guards implementados
7. ✅ **MockAPI**: Integración completa como BD externa

### Requerimientos Técnicos ✅

1. ✅ **Vue.js 3**: Composition API y reactivity
2. ✅ **Bootstrap 5.3**: Grid, modales, alertas, formularios
3. ✅ **Vue Router**: Navegación y guards
4. ✅ **Axios**: Cliente HTTP
5. ✅ **Vite**: Build tool
6. ✅ **Componentes**: Modularización correcta
7. ✅ **Services**: Capa de abstracción de API

### Requerimientos de Diseño ✅

1. ✅ **Responsive**: Mobile-first approach
2. ✅ **Branding**: Logo e identidad "Tropical Rebelde"
3. ✅ **UX**: Feedback visual, loading states
4. ✅ **Iconografía**: Bootstrap Icons consistente
5. ✅ **Formularios**: Validación HTML5
6. ✅ **Tablas**: Responsive y estilizadas

## 🐛 Troubleshooting

### Problema: Los datos no se cargan

- Verifica que MockAPI esté configurado correctamente
- Ejecuta los scripts de migración
- Revisa la consola del navegador para errores

### Problema: Login no funciona

- Asegúrate de haber ejecutado `crear-usuarios-iniciales.js`
- Verifica que el endpoint `/users` existe en MockAPI
- Revisa que las credenciales sean correctas

### Problema: Error 404 en las imágenes

- Verifica que las carpetas `img/Hombre` e `img/Mujer` existan
- Asegúrate de que las imágenes estén en `public/img/`

## 📝 Notas Importantes

- **Límite de MockAPI**: Plan gratuito tiene 1000 requests/hora
- **Datos de Prueba**: Los datos iniciales son solo para desarrollo
- **Sesión**: Se mantiene en localStorage (no es producción-ready)
- **Imágenes**: Deben estar en `public/img/` para ser accesibles

## 📚 Documentación Adicional

- [Vue.js Documentation](https://vuejs.org/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [MockAPI Documentation](https://mockapi.io/docs)
- [Axios Documentation](https://axios-http.com/)

## 📄 Licencia

Este proyecto es con fines académicos para el segundo parcial de la asignatura.

## 🤝 Contribuciones

Este proyecto es parte de una evaluación académica.

---

**Tropical Rebelde** - Oversize que rompe reglas 🔥

**Desarrollado por:**

- Harol Camilo Melo Torrado (192471)
- Jhorman Esneider Ascanio Tarazona (192534)
