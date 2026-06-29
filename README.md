# VetCare — Sistema de Gestión Veterinaria

> Aplicación web desarrollada en **Angular 21 + TypeScript 5** para digitalizar el proceso de atención de una clínica veterinaria: registro de mascotas, agenda de citas e historial clínico.

---

## Índice

- [Descripción del proyecto](#descripción-del-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Uso de la aplicación](#uso-de-la-aplicación)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Elementos Angular implementados](#elementos-angular-implementados)
- [TypeScript y POO](#typescript-y-poo)
- [Pruebas funcionales](#pruebas-funcionales)

---

## Descripción del proyecto

VetCare resuelve los siguientes problemas de una clínica veterinaria:

| Problema | Solución |
|---|---|
| Registro manual de mascotas en papel | Formulario digital con validaciones obligatorias |
| Citas solo por teléfono, sin visibilidad | Agenda digital con estado de cada cita en tiempo real |
| Sin historial clínico accesible | Vista de historial por mascota ordenado cronológicamente |
| Sin control de acceso al sistema | Login con AuthGuard que protege todas las rutas |

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 21.x | Framework principal |
| TypeScript | 5.x | Tipado estático y POO |
| Bootstrap | 5.x | Estilos y componentes UI |
| Node.js | 20.x | Entorno de ejecución |
| Angular CLI | 21.x | Scaffolding y build |
| localStorage | Web API | Persistencia de datos (sin backend) |

---

## Requisitos previos

Asegúrate de tener instalado:

- **Node.js v18 o superior** — [descargar aquí](https://nodejs.org/)
- **npm v9 o superior** (incluido con Node.js)
- **Angular CLI v17 o superior**

### Verificar versiones instaladas

```bash
node -v       # debe mostrar v18.x.x o superior
npm -v        # debe mostrar 9.x.x o superior
ng version    # debe mostrar Angular CLI 17 o superior
```

### Instalar Angular CLI (si no está instalado)

```bash
npm install -g @angular/cli
```

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# 2. Entrar a la carpeta del proyecto
cd veterinaria-app

# 3. Instalar dependencias de Node.js
npm install
```

> **Nota:** El comando `npm install` descarga todas las dependencias listadas en `package.json`, incluyendo Angular, Bootstrap y sus herramientas de compilación. Puede tomar entre 1 y 3 minutos dependiendo de la conexión.

---

## Ejecución

```bash
ng serve
```

Abrir el navegador en `http://localhost:4200`

> La aplicación se recarga automáticamente al modificar cualquier archivo fuente.

---

## Uso de la aplicación

### Credenciales de acceso

```
Usuario:    admin
Contraseña: admin123
```

### Flujo principal

#### 1. Registrar una mascota
1. Iniciar sesión con las credenciales
2. Ir a **Mascotas** en el menú
3. Hacer click en **+ Nueva mascota**
4. Completar los datos de la mascota (nombre, especie, raza, fecha de nacimiento)
5. Completar los datos del propietario (nombre, teléfono, email)
6. Hacer click en **Registrar**

#### 2. Agendar una cita
1. Ir a **Citas** en el menú
2. Hacer click en **+ Nueva cita**
3. Seleccionar la mascota del desplegable
4. Ingresar fecha, hora, motivo y veterinario
5. Hacer click en **Agendar cita**

> **Nota:** Para agendar una cita primero debe existir al menos una mascota registrada.

#### 3. Gestionar el estado de una cita
- En la agenda, las citas **Pendientes** muestran botones para **Completar** o **Cancelar**
- Las tarjetas con borde amarillo indican citas dentro de las próximas **24 horas** (directiva personalizada)

#### 4. Consultar historial clínico
1. Ir a **Mascotas**
2. Hacer click en **Historial** en la tarjeta de la mascota
3. Ver los registros ordenados del más reciente al más antiguo
4. Hacer click en **+ Agregar registro** para ingresar un nuevo diagnóstico

---

## Arquitectura del proyecto

```
veterinaria-app/
├── src/
│   ├── app/
│   │   ├── core/                          ← lógica de negocio (sin vista)
│   │   │   ├── models/
│   │   │   │   ├── base.model.ts          ← interfaces Identifiable y Auditable
│   │   │   │   ├── mascota.model.ts       ← interface Mascota + enum EspecieMascota
│   │   │   │   ├── cita.model.ts          ← interface Cita + enum EstadoCita
│   │   │   │   └── historial.model.ts     ← interface HistorialEntry
│   │   │   ├── services/
│   │   │   │   ├── storage.service.ts     ← clase abstracta genérica CRUD (base de OOP)
│   │   │   │   ├── mascota.service.ts     ← extiende StorageService<Mascota>
│   │   │   │   ├── cita.service.ts        ← extiende StorageService<Cita>
│   │   │   │   ├── historial.service.ts   ← extiende StorageService<HistorialEntry>
│   │   │   │   └── auth.service.ts        ← manejo de sesión
│   │   │   └── guards/
│   │   │       └── auth.guard.ts          ← protección de rutas con CanActivate
│   │   │
│   │   ├── shared/                        ← elementos reutilizables
│   │   │   ├── components/
│   │   │   │   ├── navbar/                ← barra de navegación global
│   │   │   │   ├── mascota-card/          ← tarjeta con @Input/@Output
│   │   │   │   └── cita-card/             ← tarjeta con @Input/@Output
│   │   │   ├── pipes/
│   │   │   │   ├── estado-cita.pipe.ts    ← PENDIENTE → "Pendiente"
│   │   │   │   └── fecha-relativa.pipe.ts ← fecha → "Hoy / Mañana / En X días"
│   │   │   ├── directives/
│   │   │   │   └── resaltar-proxima.directive.ts  ← borde amarillo si cita < 24h
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── modules/                       ← módulos lazy-loaded por funcionalidad
│   │   │   ├── auth/                      ← login
│   │   │   ├── mascotas/                  ← lista, registro, historial
│   │   │   └── citas/                     ← agenda, nueva cita
│   │   │
│   │   ├── app-routing-module.ts          ← rutas raíz con lazy loading
│   │   ├── app-module.ts                  ← módulo raíz
│   │   ├── app.ts                         ← componente raíz
│   │   └── app.html                       ← navbar + router-outlet
│   │
│   └── styles.scss                        ← Bootstrap + estilos globales
│
├── angular.json                           ← configuración del proyecto Angular
├── tsconfig.json                          ← configuración del compilador TypeScript
├── package.json                           ← dependencias del proyecto
└── README.md
```

---

## Elementos Angular implementados

### Módulos con Lazy Loading

Los módulos de funcionalidad (`auth`, `mascotas`, `citas`) se cargan bajo demanda — el bundle principal NO incluye su código hasta que el usuario navega a esa sección.

```typescript
// app-routing-module.ts
{
  path: 'mascotas',
  canActivate: [AuthGuard],
  loadChildren: () =>
    import('./modules/mascotas/mascotas.module').then(m => m.MascotasModule)
}
```

### Comunicación entre componentes (@Input / @Output)

`MascotaCardComponent` es un componente de presentación puro — recibe datos del padre y emite eventos de vuelta:

```typescript
@Input()  mascota!: Mascota;                          // datos del padre → hijo
@Output() eliminar    = new EventEmitter<string>();    // id hacia el padre
@Output() editar      = new EventEmitter<string>();
@Output() verHistorial = new EventEmitter<string>();
```

Uso en `ListaMascotasComponent`:

```html
<app-mascota-card
  [mascota]="m"
  (eliminar)="onEliminar($event)"
  (editar)="onEditar($event)"
  (verHistorial)="onVerHistorial($event)">
</app-mascota-card>
```

### Pipes personalizados

| Pipe | Uso | Entrada → Salida |
|---|---|---|
| `estadoCita` | `{{ cita.estado \| estadoCita }}` | `PENDIENTE` → `"Pendiente"` |
| `fechaRelativa` | `{{ cita.fecha \| fechaRelativa }}` | `"2026-07-01"` → `"En 2 días"` |

### Directiva personalizada

```html
<!-- Aplica borde amarillo automáticamente si la cita es hoy o mañana -->
<div class="card" [appResaltarProxima]="cita.fecha">
```

### Formularios reactivos (ReactiveForms)

Todas las pantallas de ingreso de datos usan `FormBuilder` con validaciones:

```typescript
this.form = this.fb.group({
  nombre:              ['', [Validators.required, Validators.minLength(2)]],
  propietarioTelefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
  propietarioEmail:    ['', [Validators.required, Validators.email]],
});
```

### Guard de autenticación

```typescript
// Protege /mascotas y /citas — redirige a /login si no hay sesión
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return this.authService.isAuthenticated() || (this.router.navigate(['/login']), false);
  }
}
```

---

## TypeScript y POO

### Clase abstracta genérica (StorageService\<T\>)

Base de todos los servicios de datos — demuestra abstracción, genéricos y encapsulamiento:

```typescript
export abstract class StorageService<T extends Identifiable> {
  protected abstract readonly storageKey: string; // cada hijo define su clave

  private read(): T[] { ... }   // encapsulado: localStorage oculto
  private write(): void { ... } // encapsulado: localStorage oculto

  findAll(): T[] { ... }        // heredado por todos los servicios
  save(item: T): void { ... }   // crea o actualiza (upsert)
  delete(id: string): void { ... }
}
```

### Herencia de servicios

```
StorageService<T>  (abstracta)
    ├── MascotaService  extends StorageService<Mascota>
    ├── CitaService     extends StorageService<Cita>
    └── HistorialService extends StorageService<HistorialEntry>
```

### Modelos tipados

```typescript
enum EspecieMascota { PERRO = 'Perro', GATO = 'Gato', ... }
enum EstadoCita     { PENDIENTE = 'PENDIENTE', COMPLETADA = 'COMPLETADA', CANCELADA = 'CANCELADA' }

interface Mascota { id: string; nombre: string; especie: EspecieMascota; ... }
interface Cita    { id: string; mascotaId: string; estado: EstadoCita; ... }
```

---

## Pruebas funcionales

### Cómo ejecutar las pruebas

1. Ejecutar la aplicación con `ng serve`
2. Abrir `http://localhost:4200`
3. Seguir cada caso de prueba de la tabla

### Tabla de casos de prueba

| # | Caso de prueba | Precondición | Pasos | Resultado esperado |
|---|---|---|---|---|
| 1 | Login exitoso | App abierta | Ingresar `admin` / `admin123` → click Ingresar | Redirige a `/mascotas` |
| 2 | Login fallido | App abierta | Ingresar credenciales incorrectas → click Ingresar | Mensaje de error en rojo |
| 3 | Validación formulario vacío | En `/mascotas/nueva` | Click en Registrar sin llenar campos | Todos los campos muestran error en rojo |
| 4 | Validación email inválido | En `/mascotas/nueva` | Ingresar `correo-sin-arroba` en email | Campo email muestra error |
| 5 | Validación teléfono | En `/mascotas/nueva` | Ingresar letras en teléfono | Campo teléfono muestra error |
| 6 | Registrar mascota | En `/mascotas/nueva` | Completar todos los campos correctamente | Nueva mascota aparece en la lista |
| 7 | Editar mascota | Mascota registrada | Click Editar → modificar nombre → guardar | Nombre actualizado en la lista |
| 8 | Eliminar mascota | Mascota registrada | Click Eliminar → confirmar | Mascota desaparece de la lista |
| 9 | Buscador en tiempo real | Al menos 2 mascotas | Escribir nombre de una mascota | Lista filtra en tiempo real |
| 10 | Agendar cita | Mascota registrada | Completar formulario de nueva cita | Cita aparece en la agenda |
| 11 | Completar cita | Cita pendiente en agenda | Click en "Completar" | Badge cambia a verde "Completada" |
| 12 | Cancelar cita | Cita pendiente en agenda | Click en "Cancelar" | Badge cambia a rojo "Cancelada" |
| 13 | Filtrar por estado | Varias citas en agenda | Seleccionar "Pendiente" en el filtro | Solo se muestran citas pendientes |
| 14 | Pipe fecha relativa | Cita creada para hoy | Ver tarjeta en la agenda | Muestra "Hoy" junto a la fecha |
| 15 | Directiva resaltar | Cita para hoy o mañana | Ver tarjeta en la agenda | Tarjeta tiene borde amarillo |
| 16 | Agregar historial | Mascota registrada | Click Historial → + Agregar registro → guardar | Registro aparece en el timeline |
| 17 | Ruta protegida | Sin sesión iniciada | Navegar a `localhost:4200/mascotas` | Redirige automáticamente al login |
| 18 | Cerrar sesión | Sesión activa | Click en "Cerrar sesión" | Redirige al login, menú oculto |
| 19 | Persistencia de datos | Datos ingresados | Cerrar pestaña y volver a abrir | Los datos siguen disponibles |

