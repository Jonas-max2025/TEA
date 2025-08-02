# TEA-Conecta - Apoyo para Familias

Una aplicación web moderna y responsive diseñada para apoyar a familias con niños con Trastorno del Espectro Autista (TEA), proporcionando herramientas integrales para el seguimiento, gestión de citas, recursos educativos y comunicación con el equipo de cuidado.

## 🚀 Características Principales

### 📊 **Dashboard Inteligente**
- Vista general con próximas citas y recordatorios
- Seguimiento de avances recientes y hitos importantes
- Accesos rápidos a las funciones principales
- Alertas y notificaciones en tiempo real

### 📅 **Calendario Integrado**
- Gestión completa de citas médicas y terapéuticas
- Integración con Google Calendar (opcional)
- Recordatorios personalizables
- Vista mensual y diaria con eventos destacados

### 📈 **Seguimiento de Progreso**
- Registro de hitos de desarrollo
- Seguimiento de comportamientos y patrones
- Análisis de tendencias y progreso
- Exportación de datos para profesionales

### 📚 **Biblioteca de Recursos**
- Recursos educativos organizados por categorías
- Materiales de apoyo para familias
- Guías y estrategias prácticas
- Enlaces a organizaciones especializadas

### 👥 **Gestión de Equipo**
- Contactos del equipo de cuidado
- Información de médicos, terapeutas y especialistas
- Historial de consultas y recomendaciones
- Comunicación directa con profesionales

### 🤖 **Asistente IA Inteligente**
- Chat con Google Gemini AI
- Respuestas personalizadas sobre TEA
- Explicaciones de conceptos médicos
- Generación de historias sociales visuales
- Soporte emocional y estrategias prácticas

### 🌐 **Comunidad de Apoyo**
- Conexión con otras familias
- Compartir experiencias y consejos
- Grupos de apoyo virtuales
- Recursos comunitarios

### ⚙️ **Configuración Personalizada**
- Preferencias de usuario
- Configuración de notificaciones
- Integración con servicios externos
- Personalización de la interfaz

## 🛠️ Tecnologías Utilizadas

- **React 19** con TypeScript para desarrollo robusto
- **Vite** para desarrollo rápido y optimizado
- **React Router** para navegación fluida
- **Tailwind CSS** para diseño responsive y moderno
- **Google Gemini AI** para inteligencia artificial
- **Responsive Design** con menú hamburguesa móvil

## 📱 Diseño Responsive

- **Desktop**: Sidebar fijo con navegación completa
- **Móvil**: Menú hamburguesa con overlay animado
- **Tablet**: Adaptación automática según el tamaño
- **Accesibilidad**: Navegación por teclado y lectores de pantalla

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/Jonas-max2025/TEA.git
cd TEA
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno (opcional)
Crear un archivo `.env` en la raíz del proyecto:
```env
GEMINI_API_KEY=tu_api_key_de_google_gemini
```

**Para obtener una API key de Gemini:**
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva API key
4. Copia la clave y pégala en tu archivo `.env`

**Nota:** Sin la API key, la funcionalidad del Chat IA no estará disponible, pero el resto de la aplicación funcionará normalmente.

## 🚀 Ejecutar el Proyecto

### Desarrollo
```bash
npm run dev
```
El servidor se ejecutará en `http://localhost:5173` (o el siguiente puerto disponible)

### Build para producción
```bash
npm run build
```

### Preview del build
```bash
npm run preview
```

## 📱 Guía de Uso

### 🏠 **Dashboard**
- **Vista general**: Resumen de actividades y próximos eventos
- **Recordatorios**: Alertas de citas próximas
- **Accesos rápidos**: Navegación directa a funciones principales
- **Progreso reciente**: Últimos hitos y comportamientos registrados

### 📅 **Calendario**
- **Vista mensual**: Todos los eventos del mes
- **Vista diaria**: Detalles de citas específicas
- **Agregar eventos**: Citas médicas y terapéuticas
- **Recordatorios**: Configuración de alertas personalizadas

### 📊 **Seguimiento**
- **Registrar hitos**: Logros y avances importantes
- **Comportamientos**: Patrones y observaciones
- **Análisis**: Tendencias y progreso a lo largo del tiempo
- **Exportar**: Datos para compartir con profesionales

### 📚 **Recursos**
- **Categorías**: Organizados por tipo de terapia
- **Búsqueda**: Encontrar recursos específicos
- **Favoritos**: Guardar recursos importantes
- **Compartir**: Enviar recursos a otros familiares

### 👥 **Equipo**
- **Agregar contactos**: Médicos, terapeutas, especialistas
- **Información detallada**: Especialidad, horarios, contacto
- **Historial**: Consultas y recomendaciones previas
- **Comunicación**: Enlaces directos para contacto

### 🤖 **Chat IA**
- **Preguntas generales**: Información sobre TEA
- **Conceptos médicos**: Explicaciones simplificadas
- **Estrategias**: Consejos prácticos para el día a día
- **Historias sociales**: Generación automática de materiales

### 🌐 **Comunidad**
- **Conectar**: Con otras familias en situaciones similares
- **Compartir**: Experiencias y consejos útiles
- **Aprender**: De las experiencias de otros
- **Apoyar**: Ofrecer ayuda a otras familias

### ⚙️ **Configuración**
- **Perfil**: Información personal y preferencias
- **Notificaciones**: Configurar alertas y recordatorios
- **Integración**: Conectar con Google Calendar
- **Privacidad**: Controlar la información compartida

## 🎨 Estructura del Proyecto

```
TEA-Conecta/
├── components/          # Componentes reutilizables
│   ├── layout/         # Header, Sidebar, MobileMenu
│   └── ui/            # Button, Card, Input, Spinner
├── pages/             # Páginas principales
│   ├── Dashboard.tsx  # Vista principal
│   ├── Calendar.tsx   # Gestión de citas
│   ├── Tracking.tsx   # Seguimiento de progreso
│   ├── Resources.tsx  # Biblioteca de recursos
│   ├── Team.tsx       # Gestión de equipo
│   ├── AIChat.tsx     # Chat con IA
│   ├── Community.tsx  # Comunidad de apoyo
│   └── Settings.tsx   # Configuración
├── services/          # Servicios y APIs
│   └── geminiService.ts  # Integración con Gemini AI
├── types.ts           # Definiciones TypeScript
├── constants.tsx      # Constantes e iconos
├── index.css          # Estilos globales
└── App.tsx           # Componente principal
```

## 🔧 Configuración Avanzada

### Variables de Entorno
- `GEMINI_API_KEY`: Clave de API para Google Gemini (opcional)

### Personalización
- **Colores**: Modificar en `index.css` y `constants.tsx`
- **Iconos**: Agregar nuevos en `constants.tsx`
- **Tipos**: Definir interfaces en `types.ts`
- **Navegación**: Actualizar en `Sidebar.tsx` y `MobileMenu.tsx`

### Características Técnicas
- **TypeScript**: Tipado fuerte para mayor robustez
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Accesibilidad**: Navegación por teclado y lectores de pantalla
- **Performance**: Optimización con Vite y React 19
- **SEO**: Meta tags y estructura semántica

## 🤝 Contribuir

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/NuevaFuncionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un **Pull Request**

### Guías de Contribución
- Mantén el código limpio y bien documentado
- Sigue las convenciones de TypeScript
- Prueba en diferentes dispositivos
- Actualiza la documentación cuando sea necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte y Ayuda

### Problemas Comunes
1. **Error de API**: Verifica tu `GEMINI_API_KEY` en el archivo `.env`
2. **Puerto ocupado**: El servidor automáticamente usará el siguiente puerto disponible
3. **Dependencias**: Ejecuta `npm install` si hay problemas de módulos

### Recursos Adicionales
- [Documentación de React](https://react.dev/)
- [Guía de Tailwind CSS](https://tailwindcss.com/docs)
- [Google Gemini AI](https://ai.google.dev/)
- [Organizaciones de TEA](https://www.autismspeaks.org/)

### Contacto
- **Issues**: Reporta bugs en GitHub Issues
- **Discusiones**: Únete a las conversaciones en GitHub Discussions
- **Comunidad**: Conecta con otros desarrolladores

---

## 🌟 TEA-Conecta

**Conectando familias, apoyando el desarrollo, construyendo comunidad**

*Una herramienta creada con ❤️ para las familias que necesitan apoyo en su camino con el TEA*
