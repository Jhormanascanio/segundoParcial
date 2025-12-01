/**
 * Script para crear usuarios iniciales en MockAPI
 * 
 * INSTRUCCIONES:
 * 1. Ve a https://mockapi.io/
 * 2. Crea un nuevo recurso llamado "users" con los siguientes campos:
 *    - nombre (string)
 *    - username (string)
 *    - password (string)
 *    - email (string)
 *    - rol (string)
 * 3. Ejecuta: node scripts/crear-usuarios-iniciales.js
 */

import axios from 'axios';

const MOCKAPI_URL = 'https://691d0009d58e64bf0d34aae5.mockapi.io/api/v1/users';

const usuariosIniciales = [
  {
    nombre: 'Administrador',
    username: 'admin',
    password: 'admin123',
    email: 'admin@tropico.com',
    rol: 'Administrador'
  },
  {
    nombre: 'Harol Camilo Melo Torrado',
    username: 'harol',
    password: 'harol123',
    email: 'harol@tropico.com',
    rol: 'Empleado'
  },
  {
    nombre: 'Jhorman Esneider Ascanio Tarazona',
    username: 'jhorman',
    password: 'jhorman123',
    email: 'jhorman@tropico.com',
    rol: 'Empleado'
  }
];

async function verificarEndpoint() {
  console.log('🔍 Verificando endpoint de usuarios...\n');
  try {
    const response = await axios.get(MOCKAPI_URL);
    console.log('✅ Endpoint de usuarios existe');
    console.log(`📊 Usuarios actuales: ${response.data.length}\n`);
    return true;
  } catch (error) {
    console.error('❌ El endpoint de usuarios NO existe');
    console.error('📝 Debes crear el recurso "users" en MockAPI primero');
    console.error('🔗 Ve a: https://mockapi.io/projects\n');
    console.error('Campos requeridos:');
    console.error('  - nombre (string)');
    console.error('  - username (string)');
    console.error('  - password (string)');
    console.error('  - email (string)');
    console.error('  - rol (string)\n');
    return false;
  }
}

async function crearUsuarios() {
  console.log('🚀 Creando usuarios iniciales en MockAPI...\n');
  
  const endpointExiste = await verificarEndpoint();
  if (!endpointExiste) {
    return;
  }
  
  for (const usuario of usuariosIniciales) {
    try {
      const response = await axios.post(MOCKAPI_URL, usuario);
      console.log(`✅ Usuario creado: ${usuario.nombre} (ID: ${response.data.id})`);
      await new Promise(resolve => setTimeout(resolve, 200)); // Delay entre requests
    } catch (error) {
      console.error(`❌ Error al crear ${usuario.nombre}:`);
      if (error.response) {
        console.error(`   Status: ${error.response.status}`);
        console.error(`   Data:`, error.response.data);
      } else {
        console.error(`   ${error.message}`);
      }
    }
  }
  
  console.log('\n✨ Proceso completado!');
}

crearUsuarios();
