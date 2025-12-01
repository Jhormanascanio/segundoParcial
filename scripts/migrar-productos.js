/**
 * Script para migrar los productos locales a MockAPI
 * 
 * INSTRUCCIONES:
 * 1. Asegúrate de tener Node.js instalado
 * 2. Abre una terminal en la raíz del proyecto
 * 3. Ejecuta: node scripts/migrar-productos.js
 * 
 * Este script subirá los 46 productos de productos.json a tu MockAPI
 */

import axios from 'axios';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// URL de tu MockAPI
const MOCKAPI_URL = 'https://691d0009d58e64bf0d34aae5.mockapi.io/api/v1/products';

// Leer productos locales
const productosPath = join(__dirname, '../public/productos.json');
const productosData = fs.readFileSync(productosPath, 'utf-8');
const productos = JSON.parse(productosData);

console.log(`📦 Se encontraron ${productos.length} productos para migrar\n`);

// Función para hacer delay entre peticiones
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función principal de migración
async function migrarProductos() {
  try {
    console.log('🚀 Iniciando migración a MockAPI...\n');
    
    let exitosos = 0;
    let fallidos = 0;

    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      
      try {
        // Remover el ID local para que MockAPI genere uno nuevo
        const { id, ...productoSinId } = producto;
        
        const response = await axios.post(MOCKAPI_URL, productoSinId);
        exitosos++;
        console.log(`✅ [${exitosos}/${productos.length}] Migrado: ${producto.nombre}`);
        
        // Delay de 200ms entre peticiones para no saturar la API
        await delay(200);
        
      } catch (error) {
        fallidos++;
        console.error(`❌ Error al migrar: ${producto.nombre}`, error.message);
      }
    }

    console.log('\n═══════════════════════════════════════');
    console.log('✨ MIGRACIÓN COMPLETADA');
    console.log(`✅ Exitosos: ${exitosos}`);
    console.log(`❌ Fallidos: ${fallidos}`);
    console.log('═══════════════════════════════════════\n');
    
  } catch (error) {
    console.error('💥 Error crítico en la migración:', error);
  }
}

// Ejecutar migración
migrarProductos();
