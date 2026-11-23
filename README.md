AURA Travel
Aplicación web de planificación de viajes desarrollada con React. Permite explorar destinos turísticos, consultar alternativas de vuelos y alojamiento, guardar favoritos y configurar un itinerario con un costo estimado en pesos chilenos.

El proyecto integra una API REST y una API GraphQL simuladas mediante Mock Service Worker (MSW). La comunicación se realiza a través de solicitudes HTTP; los componentes de la interfaz no acceden directamente al catálogo de datos.

Aplicación publicada: AURA Travel — GitHub Pages
Repositorio: Dr3sden/viajes-jose-soto-pfy2202
Alcance: proyecto académico con información demostrativa. Los vuelos, hoteles, tarifas, fechas, cupos y solicitudes no representan ofertas comerciales reales. La aplicación no procesa pagos ni genera reservas.

Funcionalidades
- Catálogo de destinos: seis destinos con información del país, región, actividades y descripción.
- Búsqueda y filtros: búsqueda por destino, país, región o actividad, combinada con filtros por continente y categoría.
- Detalle de destinos: información ampliada y alternativas de vuelos y hoteles obtenidas mediante GraphQL.
- Planificación de viajes: selección de vuelo y alojamiento, cálculo de noches y estimación del costo total para una persona.
- Solicitud de itinerario: formulario de contacto con validaciones y confirmación simulada mediante una mutación GraphQL.
- Favoritos: incorporación y eliminación de destinos, con persistencia local.
- Interfaz adaptable: diseño para escritorio, tablet y móvil, con navegación y controles específicos para pantallas pequeñas.
- Estados de interfaz: indicadores de carga, mensajes de error, resultados vacíos y opciones de reintento.
Tecnologías
Tecnología	Aplicación
React 19	Componentes y vistas de la interfaz
Vite 7	Entorno de desarrollo y compilación
JavaScript, HTML5 y CSS3	Lógica, estructura y presentación
React Router	Navegación mediante HashRouter
REST y Fetch API	Consulta del catálogo de destinos
GraphQL y Apollo Client	Consultas de vuelos y hoteles; mutación de solicitudes
Mock Service Worker (MSW)	Intercepción HTTP y respuestas simuladas
Context API, useState y useEffect	Estado, interacciones y persistencia
Lucide React	Iconografía
GitHub Actions	Automatización del proceso de compilación y despliegue


Arquitectura
La aplicación separa la interfaz, el acceso a datos y el backend simulado:
                         React + React Router
                                   |
                    +--------------+--------------+
                    |                             |
                Fetch API                     Apollo Client
                    |                             |
             API REST                       API GraphQL
        /api/destinations                     /graphql
        /api/destinations/:id                    |
                    |                             |
                    +--------------+--------------+
                                   |
                        Mock Service Worker
                         src/mocks/handlers.js
                                   |
                          src/mocks/catalog.js
MSW intercepta las solicitudes realizadas por el navegador y responde a partir del catálogo de datos definido en src/mocks/catalog.js. Este enfoque permite ejercitar la integración frontend–backend sin ejecutar un servidor independiente.
API REST
Método	Endpoint	Respuesta
GET	/api/destinations	Lista de destinos y cantidad total
GET	/api/destinations/:id	Detalle del destino solicitado


Cuando el identificador de destino no existe, el endpoint de detalle responde con HTTP 404.

Las solicitudes REST se gestionan mediante fetch, useState y useEffect. El hook useDestinations centraliza la carga de datos, los errores y los reintentos.
API GraphQL
Apollo Client consulta el endpoint /graphql mediante HTTP POST. La operación GetTravelOptions recupera vuelos y hoteles asociados a un destino:
query GetTravelOptions($destinationId: ID!) {
  flights(destinationId: $destinationId) {
    id
    airline
    origin
    destination
    departureDate
    returnDate
    price
    seatsAvailable
  }
  hotels(destinationId: $destinationId) {
    id
    name
    pricePerNight
    availableRooms
    rating
    amenities
  }
}
La operación CreateInquiry recibe los identificadores del destino, vuelo y hotel, junto con el nombre y correo de contacto. El mock valida la información y devuelve una confirmación ficticia; no se registra una reserva real ni se envían los datos a un servicio externo.

El esquema de referencia se encuentra en [`docs/schema.graphql`](docs/schema.graphql) y los manejadores de ambas APIs en [`src/mocks/handlers.js`](src/mocks/handlers.js).
Estado y persistencia
TravelContext administra los destinos favoritos y la selección del itinerario. Ambos estados se guardan en localStorage y se recuperan al volver a abrir la aplicación en el mismo navegador. Apollo Client incorpora una caché en memoria para las consultas GraphQL.

El costo estimado se calcula sumando el precio del vuelo de ida y vuelta al precio por noche del hotel multiplicado por la duración de la estadía.
Instalación y ejecución
Requisitos: Node.js 20.19.0 o superior, npm y un navegador con soporte de Service Workers. La aplicación se ejecuta mediante localhost en desarrollo; para un despliegue web utiliza HTTPS.
git clone https://github.com/Dr3sden/viajes-jose-soto-pfy2202.git
cd viajes-jose-soto-pfy2202
npm install
npm run dev
La dirección de desarrollo configurada es http://localhost:5173/.

Durante npm install, el script postinstall genera public/mockServiceWorker.js, utilizado por MSW para interceptar las solicitudes. La aplicación debe abrirse desde el servidor de Vite y no mediante el archivo index.html directamente.
Scripts disponibles
Comando	Descripción
npm run dev	Inicia el servidor local de desarrollo
npm run build	Compila la aplicación en dist/
npm run preview	Ejecuta una vista previa de la compilación
npm run test:data	Valida la integridad del catálogo simulado
npm run mock:init	Genera o actualiza el archivo del Service Worker


Estructura del proyecto
viajes-jose-soto-pfy2202/
├── .github/workflows/pages.yml    # Workflow de GitHub Pages
├── docs/schema.graphql            # Esquema de referencia de GraphQL
├── public/
│   ├── favicon.svg
│   └── images/travel-fallback.svg  # Imagen de respaldo
├── scripts/verify-data.mjs        # Validación del catálogo
├── src/
│   ├── components/                # Componentes reutilizables
│   ├── context/                   # Estado compartido
│   ├── hooks/                     # Consultas REST
│   ├── lib/                       # Apollo Client y utilidades
│   ├── mocks/                     # Datos y manejadores de API
│   ├── pages/                     # Vistas de la aplicación
│   ├── App.jsx                    # Configuración de rutas
│   ├── main.jsx                   # Inicialización de React y MSW
│   └── styles.css                 # Estilos globales y responsivos
├── index.html
├── package.json
└── vite.config.js
Rutas
Ruta	Vista
#/	Inicio
#/destinos	Catálogo de destinos
#/destinos/:id	Detalle, vuelos, hoteles e itinerario
#/favoritos	Destinos guardados
#/como-funciona	Presentación del flujo de planificación
Cualquier otra ruta	Página no encontrada


El uso de HashRouter permite mantener la navegación interna en un alojamiento estático sin necesidad de configurar reglas de reescritura de URL en el servidor.
Verificación
El proyecto incluye un validador de datos ejecutable con:
npm run test:data
El script comprueba la estructura del catálogo: 6 destinos, 18 vuelos y 18 hoteles, identificadores únicos de destinos, relaciones entre registros, precios positivos, rangos de fechas y disponibilidad.

Las integraciones pueden inspeccionarse en las herramientas de desarrollo del navegador, en la pestaña Network: las consultas al catálogo utilizan GET /api/destinations y GET /api/destinations/:id; los vuelos, hoteles y solicitudes de itinerario utilizan POST /graphql.

La interfaz contempla los siguientes escenarios funcionales:
Área	Comportamiento
Navegación	Acceso a todas las vistas y manejo de rutas inexistentes
Búsqueda	Coincidencias por destino, país, región y actividad
Filtros	Combinación de continente y categoría
Integración REST	Obtención del catálogo y detalle del destino
Integración GraphQL	Consulta de vuelos y hoteles por destino
Itinerario	Selección, cambio y eliminación de opciones; cálculo del total
Formulario	Validación de datos y respuesta simulada
Favoritos	Guardado y eliminación con persistencia local
Diseño adaptable	Reorganización de tarjetas, menú móvil y pestañas de opciones


Despliegue en GitHub Pages
La aplicación se encuentra publicada en GitHub Pages y puede consultarse desde el siguiente enlace:
https://dr3sden.github.io/viajes-jose-soto-pfy2202/
Abrir AURA Travel

El código fuente y el historial de cambios están disponibles en el repositorio de GitHub.

El despliegue se gestiona mediante [GitHub Actions](.github/workflows/pages.yml), que instala las dependencias, genera el Service Worker de MSW, compila la aplicación con Vite y publica los archivos estáticos de dist/ en GitHub Pages.

La configuración de Vite ajusta la ruta base al repositorio viajes-jose-soto-pfy2202, mientras que HashRouter conserva la navegación interna en el hosting estático. Las APIs simuladas funcionan en el navegador mediante Mock Service Worker, sin requerir un servidor backend adicional.

Para generar y revisar una compilación local:
npm run build
npm run preview
Consideraciones
- El catálogo es estático y sus datos tienen fines demostrativos; no existe sincronización con aerolíneas, hoteles ni proveedores externos.
- La selección de un vuelo o alojamiento no modifica los cupos simulados.
- Los favoritos y el itinerario se almacenan únicamente en el navegador utilizado; no hay autenticación ni sincronización entre dispositivos.
- Las solicitudes de itinerario no se guardan en una base de datos ni generan correos, pagos o reservas.
- Las fotografías proceden de Unsplash y se cargan desde un servicio externo. Los componentes de contenido incluyen una ilustración SVG local como respaldo cuando corresponde.
- La interfaz utiliza las fuentes DM Sans, Manrope y Playfair Display, además de estilos de movimiento reducido mediante prefers-reduced-motion.
Referencias técnicas
- React
- Vite
- React Router
- Apollo Client
- GraphQL
- Mock Service Worker
- Lucide
- Unsplash
José Soto
Desarrollo Frontend II (PFY2202) · Experiencia 2, Semana 5.