# PruebaAudi - Frontend

Aplicación web desarrollada con **Angular** como frontend para la prueba técnica de Audi.

La aplicación permite gestionar:

* Estudiantes
* Profesores
* Notas

El frontend consume la API REST desarrollada en ASP.NET Core y proporciona interfaces para consultar, crear, editar y eliminar registros.

---

## Tecnologías

* Angular 22
* TypeScript
* Angular Material
* Angular Router
* Angular Forms
* RxJS
* Vitest
* HTML5
* SCSS

Las dependencias principales se encuentran definidas en `package.json`.

---

# Requisitos

Para ejecutar el proyecto se requiere:

* Node.js
* npm
* Angular CLI 22
* Backend de la prueba ejecutándose

El proyecto utiliza `npm@12.0.2` como package manager y Angular CLI `22.1.7`.

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Yulioss/PruebaAudi.git
```

Ingresar al proyecto:

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
npm start
```

También puede utilizarse:

```bash
ng serve
```

La aplicación estará disponible normalmente en:

```text
http://localhost:4200/
```

Angular CLI recarga automáticamente la aplicación cuando se realizan cambios en el código.

---

# Estructura del proyecto

La aplicación utiliza una organización basada en funcionalidades:

```text
PruebaAudi/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── core/
│   │   │
│   │   ├── features/
│   │   │   ├── students/
│   │   │   ├── teachers/
│   │   │   └── notes/
│   │   │
│   │   ├── layout/
│   │   │
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── ...
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── angular.json
├── package.json
├── package-lock.json
└── tsconfig.json
```

La carpeta `src/app` contiene la aplicación Angular y las funcionalidades están separadas por módulos funcionales como estudiantes, profesores y notas.

---

# Funcionalidades

## Estudiantes

La sección de estudiantes permite:

* Listar estudiantes.
* Crear estudiantes.
* Editar estudiantes.
* Eliminar estudiantes.
* Consultar información mediante la API.

Rutas disponibles:

```text
/students
/students/new
/students/edit/:id
```

Estas rutas están configuradas en `app.routes.ts`.

---

## Profesores

La sección de profesores permite gestionar los registros de profesores.

Rutas:

```text
/teachers
/teachers/new
/teachers/edit/:id
```

---

## Notas

La sección de notas permite gestionar las notas registradas en el sistema.

Rutas:

```text
/notes
/notes/new
/notes/edit/:id
```

---

# Navegación

La aplicación utiliza **Angular Router**.

La estructura principal utiliza un `MainLayout` que contiene las diferentes funcionalidades:

```text
MainLayout
│
├── Students
│   ├── List
│   ├── New
│   └── Edit
│
├── Teachers
│   ├── List
│   ├── New
│   └── Edit
│
└── Notes
    ├── List
    ├── New
    └── Edit
```

La ruta raíz redirige automáticamente a:

```text
/students
```

---

# Configuración de Angular

La configuración principal de la aplicación se encuentra en:

```text
src/app/app.config.ts
```

Actualmente se registran:

* Angular Router.
* HttpClient.

```typescript
providers: [
  provideRouter(routes),
  provideHttpClient()
]
```

Esto permite utilizar el sistema de rutas y realizar peticiones HTTP hacia el backend.

---

# Comunicación con el Backend

El frontend utiliza `HttpClient` de Angular para comunicarse con la API REST.

El flujo general es:

```text
Usuario
   │
   ▼
Angular Component
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
PostgreSQL
```

La URL de la API debe configurarse de acuerdo con el puerto donde se esté ejecutando el backend.

---

# Backend

El backend utilizado por esta aplicación se encuentra en el siguiente repositorio:

```text
https://github.com/Yulioss/ApiPruebaAudi
```

El backend está desarrollado con:

* ASP.NET Core 8
* Entity Framework Core
* PostgreSQL
* Npgsql

---

# Ejecución completa del proyecto

Para ejecutar el sistema completo se deben iniciar tanto el backend como el frontend.

## 1. Backend

Clonar y ejecutar:

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

Ejecutar la API:

```bash
dotnet run --project ApiPruebaAudi
```

---

## 2. Frontend

En otra terminal:

```bash
git clone https://github.com/Yulioss/PruebaAudi.git
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm start
```

Abrir:

```text
http://localhost:4200
```

---

# Rutas de la aplicación

| Funcionalidad     | Ruta                 |
| ----------------- | -------------------- |
| Estudiantes       | `/students`          |
| Crear estudiante  | `/students/new`      |
| Editar estudiante | `/students/edit/:id` |
| Profesores        | `/teachers`          |
| Crear profesor    | `/teachers/new`      |
| Editar profesor   | `/teachers/edit/:id` |
| Notas             | `/notes`             |
| Crear nota        | `/notes/new`         |
| Editar nota       | `/notes/edit/:id`    |

Las rutas corresponden a la configuración actual de Angular.

---

# Build

Para generar una compilación del proyecto:

```bash
npm run build
```

También se puede utilizar:

```bash
ng build
```

Los archivos compilados se generan dentro de la carpeta:

```text
dist/
```

Angular realiza optimizaciones para la compilación de producción.

---

# Pruebas unitarias

El proyecto utiliza **Vitest** como test runner.

Para ejecutar las pruebas:

```bash
npm test
```

También:

```bash
ng test
```

La configuración de dependencias del proyecto incluye Vitest y JSDOM.

---

# End-to-End Testing

Angular CLI permite configurar pruebas end-to-end mediante:

```bash
ng e2e
```

El proyecto no incluye un framework E2E por defecto, por lo que puede utilizarse la herramienta que se considere más adecuada.

---

# Comandos útiles

### Instalar dependencias

```bash
npm install
```

### Ejecutar aplicación

```bash
npm start
```

### Ejecutar Angular CLI

```bash
ng serve
```

### Compilar

```bash
npm run build
```

### Compilar observando cambios

```bash
npm run watch
```

### Ejecutar pruebas

```bash
npm test
```

### Ejecutar pruebas directamente con Angular CLI

```bash
ng test
```

### Generar un componente

```bash
ng generate component nombre-componente
```

---

# Arquitectura de la aplicación

La aplicación sigue una separación por responsabilidades:

```text
                    ┌──────────────────┐
                    │      Angular     │
                    │       View       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Components    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Services     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    HttpClient    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   ASP.NET Core   │
                    │       API        │
                    └──────────────────┘
```

Esto permite mantener separadas la presentación, navegación y comunicación con el backend.

---

# Dependencias principales

| Dependencia      | Uso                      |
| ---------------- | ------------------------ |
| Angular          | Framework principal      |
| Angular Material | Componentes de interfaz  |
| Angular Router   | Navegación               |
| Angular Forms    | Formularios              |
| RxJS             | Programación reactiva    |
| TypeScript       | Lenguaje principal       |
| Vitest           | Pruebas unitarias        |
| JSDOM            | Entorno DOM para pruebas |

Las versiones exactas se encuentran en `package.json`.

---

# Autor

**Julian Rangel**

Ingeniero de Sistemas / .NET Developer
