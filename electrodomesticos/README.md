# Servicio Técnico de Electrodomésticos

Este proyecto es una página web estática moderna y optimizada para SEO, diseñada para un servicio técnico de reparación de electrodomésticos.

## Características

*   **Frontend:** HTML5, CSS3 (con variables personalizadas), JavaScript (Vanilla).
*   **Backend:** Serverless con **Supabase** (PostgreSQL).
*   **SEO:** Optimización avanzada con Schema.org, Open Graph y metaetiquetas para cada tipo de electrodoméstico (Lavadoras, Frigoríficos, etc.).
*   **Diseño:** Responsivo (Mobile-first), limpio y profesional.

## Estructura del Proyecto

*   `frontend/`: Contiene todo el código fuente de la web.
    *   `*.html`: Páginas de aterrizaje para cada servicio.
    *   `css/style.css`: Estilos globales.
    *   `js/main.js`: Lógica del frontend y conexión con Supabase.

## Configuración

El proyecto utiliza **Supabase** para gestionar el formulario de contacto y el consentimiento de cookies.

1.  Crea un proyecto en [Supabase](https://supabase.com/).
2.  Ejecuta el script SQL proporcionado (`supabase_setup.sql`) en el editor SQL de Supabase para crear las tablas.
3.  Configura la URL y la Anon Key en `frontend/js/main.js`.

## Despliegue

Al ser una web estática, puedes desplegarla gratuitamente en:
*   GitHub Pages
*   Vercel
*   Netlify

Simplemente sube el contenido de la carpeta `frontend` (o configura tu repositorio para que publique desde esa carpeta).
