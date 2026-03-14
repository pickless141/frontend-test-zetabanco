# Zeta Banco - Simulador de Transferencias Internas

Aplicación frontend desarrollada como prueba técnica para simular transferencias entre cuentas bancarias internas, con validaciones contextuales, historial diario, dashboard resumido y visualización en tiempo real del mercado de criptomonedas.

## Descripción

Este proyecto implementa un módulo de simulación de transacciones entre cuentas de una misma entidad financiera, permitiendo validar operaciones en tiempo real y visualizar métricas clave del día.

La solución fue desarrollada con enfoque en experiencia de usuario, organización del código, escalabilidad y responsividad.

## Tecnologías utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- react-i18next / i18next
- Recharts
- next-themes
- Sonner
- Lucide React

## Funcionalidades implementadas

### Simulación de transferencias
- Selección de cuenta origen y destino
- Visualización de nombre y foto del titular seleccionado
- Ingreso de monto a transferir
- Validación de saldo disponible
- Validación para impedir transferencias a la misma cuenta
- Confirmación local de transferencia exitosa
- Actualización local de saldos

### Historial del día
- Listado de transferencias simuladas
- Filtro por cuenta origen
- Filtro por cuenta destino
- Filtro por monto mínimo
- Total transferido según filtros aplicados
- Paginación configurable

### Dashboard resumido
- Total de transacciones del día
- Total de dinero transferido
- Cuenta con más transacciones
- Gráfica de transferencias por cuenta origen
- Vista en tiempo real del mercado crypto mediante WebSocket

### Extras implementados
- Internacionalización (español / inglés)
- Modo oscuro
- Notificaciones tipo toast
- Diseño responsive
- Persistencia de transferencias, cuentas e idioma usando LocalStorage

## Fuente de datos mock

- Cuentas precargadas desde archivo JSON local
- Transferencias almacenadas en Zustand y persistidas en LocalStorage
- Fotos de usuarios obtenidas desde Random User
- Mercado crypto en tiempo real usando Finnhub WebSocket

## Requisitos previos

Antes de ejecutar el proyecto, asegurate de tener instalado:

- Node.js 18 o superior
- npm 9 o superior

Podés verificarlo con:

node -v
npm -v

## 1 clonar el proyecto 

- git clone https://github.com/pickless141/frontend-test-zetabanco.git
- cd frontend-zetabanco

# 2 instalar dependencias 

- npm install 

## 3 Configurar variables de entorno
- Crear en un archivo .env.local en la raiz del proyecto con el siguiente contenido:
NEXT_PUBLIC_FINNHUB_API_KEY=tu_api_key_de_finnhub

Nota: esta variable es necesaria para habilitar la vista en tiempo real del mercado crypto mediante de WebSocket

## 4 Ejecutar en modo desarrollo 

- npm run dev

La aplicacion quedara disponible en: 
http://localhost:3000

## Scripts disponibles

- Desarrollo -> npm run dev

- Build de produccion -> npm run build 

- Ejecutar build de produccion -> npm run start

- Lint -> npm run lint 

## Consideraciones funcionales

- Todas las transferencias son simuladas localmente 
- No existe integracion con un backend real 
- Los saldos se actualizan localmente al confirmar una operacion
- Las transferencias y saldos simulados persisten mientras exista LocalStorage en el navegador
- Si no se configura la API Key de Finnhub, la aplicacion seguira funcionando, pero la seccion de mercado crypto mostrara un mensaje informativo 

## Desiciones tecnicas

- Next.js + App Router: utilizado para organizar la aplicacion por secciones y layouts compartidos
- TypeScript: para mejorar mantenibilidad, legibilidad y seguridad en el tipado
- Zustand: elegido para el manejo global de estado por su simplicidad y bajo nivel de boilerplate
- LocalStorage: utilizado para persistir cuentas, transferencias e idioma seleccionado
- Mock local en json: suficiente para el alcance solicitado, evitando dependencia de un backend real
- react-i18next: implementado para soportar internalizacion en español e ingles
- Finnhub WebSocket: utilizado para cumplir con la vista en tiempo real del mercado crypto
- Recharts: incorporado para representar visualmente el resumen de transferencias
- next-themes: implementado para soporte de modo oscuro 


## Autor
Ivan Masi


