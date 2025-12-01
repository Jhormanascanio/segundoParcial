# Instrucciones para Configurar MockAPI

## 1. Crear Recurso de Usuarios en MockAPI

Antes de ejecutar los scripts de migración, debes configurar manualmente el endpoint de usuarios en MockAPI:

### Pasos:

1. **Accede a MockAPI**: https://mockapi.io/
2. **Inicia sesión** con tu cuenta
3. **Selecciona tu proyecto**: Busca el proyecto con ID `691d0009d58e64bf0d34aae5`
4. **Crea el recurso "users"**:
   - Click en "+ New Resource"
   - Nombre del recurso: **users**
   - Configura los siguientes campos (schema):

```json
{
  "nombre": "string",
  "username": "string",
  "password": "string",
  "email": "string",
  "rol": "string"
}
```

5. **Guarda el recurso**

## 2. Verificar Endpoint de Products

Asegúrate de que el endpoint de productos ya existe:

- URL: https://691d0009d58e64bf0d34aae5.mockapi.io/api/v1/products
- Schema necesario:

```json
{
  "nombre": "string",
  "descripcion": "string",
  "precio": "number",
  "categoria": "string",
  "genero": "string",
  "imagen": "string"
}
```

Si no existe, créalo siguiendo los mismos pasos del punto 1.

## 3. Ejecutar Scripts de Migración

Una vez configurados los recursos en MockAPI, ejecuta los siguientes comandos en orden:

### 3.1. Crear Usuarios Iniciales

```bash
node scripts/crear-usuarios-iniciales.js
```

Este script creará 3 usuarios:

- **admin** / admin123 (Administrador)
- **harol** / harol123 (Administrador)
- **jhorman** / jhorman123 (Empleado)

### 3.2. Migrar Productos

```bash
node scripts/migrar-productos.js
```

Este script migrará los 46 productos desde `public/productos.json` a MockAPI.
El proceso toma aproximadamente 10 segundos debido al delay de 200ms entre cada producto.

## 4. Verificar Migración

Después de ejecutar los scripts:

1. **Verifica usuarios**:

   - GET: https://691d0009d58e64bf0d34aae5.mockapi.io/api/v1/users
   - Deberías ver 3 usuarios

2. **Verifica productos**:
   - GET: https://691d0009d58e64bf0d34aae5.mockapi.io/api/v1/products
   - Deberías ver 46 productos

## 5. Probar la Aplicación

1. **Inicia el servidor de desarrollo**:

```bash
npm run dev
```

2. **Accede a la aplicación**: http://localhost:3000

3. **Inicia sesión** con cualquiera de los usuarios creados:

   - Usuario: admin / Contraseña: admin123
   - Usuario: harol / Contraseña: harol123
   - Usuario: jhorman / Contraseña: jhorman123

4. **Prueba el CRUD**:
   - **Productos**: Crear, editar, eliminar productos
   - **Usuarios**: Crear, editar, eliminar usuarios

## 6. Notas Importantes

- **Límite de MockAPI**: La versión gratuita tiene límite de 1000 requests por hora
- **Delay entre requests**: Los scripts incluyen delay de 200ms para evitar rate limiting
- **Datos de prueba**: Los usuarios y productos iniciales son solo para desarrollo
- **Autenticación**: El sistema valida credenciales contra MockAPI, pero usa localStorage para mantener la sesión

## 7. Troubleshooting

### Error: "Cannot POST to /users"

- **Causa**: El recurso 'users' no existe en MockAPI
- **Solución**: Crea el recurso manualmente siguiendo el paso 1

### Error: "Network Error" o "404"

- **Causa**: URL incorrecta o proyecto no existe
- **Solución**: Verifica que la URL en `mockapi.js` sea correcta

### Los productos no se cargan

- **Causa**: El endpoint de products no tiene datos
- **Solución**: Ejecuta `node scripts/migrar-productos.js`

### Login no funciona

- **Causa**: No hay usuarios en MockAPI
- **Solución**: Ejecuta `node scripts/crear-usuarios-iniciales.js`

## 8. URLs de Referencia

- **MockAPI Dashboard**: https://mockapi.io/projects
- **API Base URL**: https://691d0009d58e64bf0d34aae5.mockapi.io/api/v1/
- **Documentación MockAPI**: https://mockapi.io/docs
