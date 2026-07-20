# TaskFlow

TaskFlow es una aplicación móvil desarrollada con React Native y Expo. Su objetivo es ayudar a los usuarios a organizar y gestionar sus tareas de forma sencilla e intuitiva.

## Tecnologías utilizadas

- React Native
- Expo
- JavaScript

## Ejecución del proyecto

1. Instalar las dependencias:

```bash
npm install
```

2. Iniciar la aplicación:

```bash
npx expo start
```

3. Abrir la aplicación utilizando:
- Expo Go.
- Un emulador de Android.
- Un simulador de iOS (macOS).

## Checkpoint 1

En este primer checkpoint se desarrolló:

- Configuración inicial del proyecto con Expo.
- Componente de bienvenida.
- Pantalla principal con el título **TaskFlow**.
- Subtítulo **"Checkpoint 1: Estructura Base"**.
- Estilos implementados con `StyleSheet`.

## Checkpoint 1 - Estructura Base

En este checkpoint se desarrolló la arquitectura inicial de la aplicación TaskFlow siguiendo una organización profesional de carpetas.

### Estructura implementada

Dentro de la carpeta `src` se crearon:

- `components/`
  - `ProfileCard.js`

- `screens/`
  - `HomeScreen.js`
  - `ProfileScreen.js`

- `assets/`
  - Recursos gráficos de la aplicación.

- `constants/`
  - `colors.js` para centralizar los colores del diseño.

### Componentes desarrollados

#### ProfileCard

Se creó un componente reutilizable para mostrar información del usuario.

Características:

- Recibe datos mediante props:
  - `name`
  - `role`
  - `image`

- Utiliza el componente `Image` de React Native para mostrar el avatar.
- Implementa estilos con `StyleSheet.create`.
- Diseño con tarjeta, bordes redondeados, padding y sombras.

### Pantallas creadas

#### HomeScreen

Pantalla inicial preparada para mostrar las tareas del usuario.

#### ProfileScreen

Pantalla que renderiza el componente `ProfileCard` con datos de prueba:

- Nombre del usuario.
- Rol.
- Imagen de perfil.

### Sistema de estilos

Se creó un archivo de constantes para mantener una identidad visual consistente:

- Colores principales.
- Fondo.
- Texto.
- Elementos de tarjeta.

### Visualización

Actualmente la aplicación permite visualizar la `ProfileScreen` funcionando correctamente mediante Expo.