# PruebaAudi - Frontend

Aplicación web desarrollada con **Angular** para la prueba técnica de Audi.

El frontend permite gestionar la información relacionada con:

* Estudiantes
* Profesores
* Notas
* Dashboard

La aplicación consume una API REST desarrollada en **ASP.NET Core 8**, utilizando PostgreSQL como base de datos.

---
## Arquitectura
Arquitectura basada en funcionalidades (Feature-based Architecture)


## Tecnologías

* Angular 22
* TypeScript
* Angular Material
* Angular Router
* RxJS
* HttpClient
* SCSS
* Vitest

El proyecto fue generado utilizando **Angular CLI 22.1.7** y utiliza Vitest como test runner para las pruebas unitarias.

---

# Requisitos

Para ejecutar el proyecto localmente se requiere:

* Node.js
* npm
* Angular CLI 22
* Backend de la aplicación ejecutándose

Se recomienda utilizar una versión de Node.js compatible con Angular 22.

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Yulioss/PruebaAudi.git
```

Ingresar al directorio:

```bash
cd PruebaAudi
```

Instalar las dependencias:

```bash
npm install
```

---

# Ejecutar la aplicación

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

También puede utilizarse el script configurado en el proyecto:

```bash
npm start
```

Una vez iniciado el servidor, acceder a:

```text
http://localhost:4200/
```

Angular recarga automáticamente la aplicación cuando se modifican los archivos fuente.

---

# Backend

Este frontend consume el backend desarrollado específicamente para la prueba.

Repositorio:

```text
https://github.com/Yulioss/ApiPruebaAudi
```

El backend está desarrollado utilizando:

* ASP.NET Core 8
* Entity Framework Core
* PostgreSQL
* Npgsql
* Arquitectura por capas

Para que el frontend funcione correctamente, el backend debe estar ejecutándose y la URL configurada en el frontend debe apuntar al endpoint correspondiente.

---

# Arquitectura

El proyecto utiliza una estructura organizada por funcionalidades y responsabilidades.

```text
src/
└── app/
    ├── core/
    │
    ├── features/
    │   ├── students/
    │   ├── teachers/
    │   └── notes/
    │
    ├── layout/
    │
    ├── app.config.ts
    ├── app.routes.ts
    └── ...
```

### Core

Contiene elementos compartidos de la aplicación, como servicios, modelos o funcionalidades que son utilizadas por diferentes módulos.

### Features

Contiene las funcionalidades principales de la aplicación.

```text
features/
├── students/
├── teachers/
└── notes/
```

Esto permite mantener cada funcionalidad separada y facilita el mantenimiento del proyecto.

### Layout

Contiene la estructura visual principal de la aplicación.

---

# Funcionalidades

## Dashboard

La aplicación cuenta con un dashboard que presenta información agregada obtenida desde el backend.

El dashboard permite visualizar de manera resumida la información principal del sistema.

---

## Estudiantes

Permite:

* Consultar estudiantes.
* Buscar estudiantes.
* Crear estudiantes.
* Editar estudiantes.
* Eliminar estudiantes.
* Navegar mediante paginación.

---

## Profesores

Permite:

* Consultar profesores.
* Crear profesores.
* Editar profesores.
* Eliminar profesores.

---

## Notas

Permite:

* Consultar notas.
* Buscar notas.
* Crear notas.
* Editar notas.
* Eliminar notas.
* Consultar información mediante paginación.

---

# Comunicación con la API

La comunicación con el backend se realiza mediante `HttpClient` de Angular.

El flujo de comunicación es:

```text
Usuario
   │
   ▼
Component
   │
   ▼
Service
   │
   ▼
HttpClient
   │
   ▼
ASP.NET Core API
   │
   ▼
Entity Framework Core
   │
   ▼
PostgreSQL
```

La utilización de servicios permite separar la lógica de comunicación HTTP de los componentes visuales.

---

# Rutas

La navegación de la aplicación se administra mediante **Angular Router**.

Las principales funcionalidades están organizadas mediante rutas independientes:

```text
/students
/teachers
/notes
/dashboard
```

Las rutas de creación y edición siguen la estructura correspondiente a cada funcionalidad.

---

# Paginación

Las listas que manejan grandes cantidades de registros utilizan paginación.

El frontend envía al backend información como:

```text
pageNumber
pageSize
searchTerm
```

Ejemplo:

```text
?pageNumber=1&pageSize=10&searchTerm=Juan
```

Esto permite evitar cargar todos los registros simultáneamente y mejora el rendimiento de las consultas.

---

# Manejo de formularios

Los formularios utilizados para crear y editar información realizan validaciones antes de enviar los datos al backend.

La validación permite controlar:

* Campos requeridos.
* Valores inválidos.
* Datos incompletos.
* Errores provenientes de la API.

---

# Manejo de errores

Los errores producidos durante las peticiones HTTP son controlados desde la aplicación para proporcionar retroalimentación al usuario.

Los errores provenientes del backend pueden ser mostrados en la interfaz de acuerdo con el código de respuesta HTTP.

---

# Angular Material

La aplicación utiliza componentes de **Angular Material** para construir la interfaz de usuario.

Esto permite utilizar componentes reutilizables como:

* Tablas.
* Formularios.
* Botones.
* Inputs.
* Dialogs.
* Paginadores.
* Iconos.
* Mensajes.

---

# Ejecutar el proyecto completo

Para ejecutar el sistema completo se deben levantar el backend y el frontend.

## 1. Backend

Clonar:

```bash
git clone https://github.com/Yulioss/ApiPruebaAudi.git
```

Configurar PostgreSQL y la cadena de conexión.

Aplicar las migraciones:

```bash
dotnet ef database update \
  --project Infraestructure \
  --startup-project ApiPruebaAudi
```

Ejecutar:

```bash
dotnet run --project ApiPruebaAudi
```

---

## 2. Frontend

En otra terminal:

```bash
git clone https://github.com/Yulioss/PruebaAudi.git
cd PruebaAudi
npm install
npm start
```

Abrir:

```text
http://localhost:4200/
```

---

# Build

Para generar una compilación del proyecto:

```bash
ng build
```

Los archivos generados se almacenan en:

```text
dist/
```

Angular realiza optimizaciones sobre la compilación para mejorar el rendimiento de la aplicación.

Para una compilación de producción:

```bash
ng build --configuration production
```

---

# Pruebas unitarias

El proyecto utiliza **Vitest** como test runner.

Para ejecutar las pruebas:

```bash
ng test
```

El comando ejecuta las pruebas unitarias configuradas en el proyecto.

---

# Generación de componentes

Angular CLI permite generar nuevos componentes mediante:

```bash
ng generate component nombre-componente
```

También puede utilizarse la forma abreviada:

```bash
ng g c nombre-componente
```

Para consultar todas las opciones disponibles:

```bash
ng generate --help
```

---

# Comandos principales

| Comando                 | Descripción                      |
| ----------------------- | -------------------------------- |
| `npm install`           | Instala las dependencias         |
| `npm start`             | Inicia el servidor de desarrollo |
| `ng serve`              | Inicia el servidor de Angular    |
| `ng build`              | Compila la aplicación            |
| `ng test`               | Ejecuta las pruebas unitarias    |
| `ng generate component` | Genera un componente             |
| `ng generate --help`    | Muestra los comandos disponibles |

---

# Estructura general del sistema

```text
┌──────────────────────────┐
│        Angular           │
│        Frontend          │
└────────────┬─────────────┘
             │
             │ HTTP
             ▼
┌──────────────────────────┐
│      ASP.NET Core        │
│          API             │
└────────────┬─────────────┘
             │
             │ Entity Framework
             ▼
┌──────────────────────────┐
│       PostgreSQL         │
└──────────────────────────┘
```

---

# Backend relacionado

El backend correspondiente a este proyecto se encuentra en:

```text
https://github.com/Yulioss/ApiPruebaAudi
```

Allí se encuentra la implementación de la API, acceso a datos, entidades, repositorios y migraciones de Entity Framework Core.

---

# Autor

**Julian Rangel**

Ingeniero de Sistemas / .NET Developer
