# Proyecto de Consultorio Médico

Este proyecto universitario tiene como objetivo demostrar el uso de HTML, CSS y JavaScript en la creación de una página web para un consultorio médico, destinada tanto a médicos como a usuarios. A través de esta aplicación, se busca facilitar la gestión de citas, información de pacientes y servicios médicos.

## Tabla de requerimientos

| ID | Requerimiento             | Descripción                                      | Prioridad  |
|----|---------------------------|--------------------------------------------------|------------|
| 1  | Registro de usuario       | Los usuarios deben poder ingresar a la plataforma| Alta       |
| 2  | Roles de usuario          | El sistema permite asignar roles a los usuarios | Alta       |
| 3  | Agendar citas             | Los pacientes pueden agendar citas con médicos  | Alta       |
| 4  | Gestión de citas          | Los médicos pueden ver y gestionar las citas    | Media      |
| 5  | Cambio de roles           | Los usuarios pueden cambiar su rol dentro de la plataforma | Media   |

## Estructura de carpetas

- **carpeta `css`**: Contiene el archivo `styles.css` para la hoja de estilos del proyecto.
- **carpeta `html`**: Contiene los archivos `index.html` y `roll.html`, que son las páginas principales del proyecto.
- **carpeta `js`**: Contiene los archivos `script.js` y `roll.js`, que gestionan la interactividad y las funcionalidades dinámicas del proyecto.

## Funcionalidades

1. **Gestión de Roles**: El sistema permite asignar roles de usuario (Administrador, Médico, Paciente), lo que permite mostrar opciones de menú dinámicas según el rol del usuario.
   
2. **Agenda de Citas**: Los pacientes pueden agendar citas con médicos seleccionando la fecha y hora disponible. El formulario permite escoger una fecha sin restricciones de días, pero con un límite de hora (8:00 AM a 12:00 PM).

3. **Cambio de Roles**: Los usuarios pueden cambiar su rol a otro disponible en el sistema, lo que les permite acceder a diferentes opciones y funcionalidades según su rol.

## Contenido

- **index.html**: Página principal del consultorio.
- **roll.html**: Página de gestión para médicos y administradores.
- **styles.css**: Hoja de estilos para la presentación.
- **script.js**: Archivo JavaScript que añade interactividad (gestión de roles, agendar citas, etc.).
- **roll.js**: Archivo JavaScript adicional para la gestión de funcionalidades relacionadas con los roles y la vista específica para médicos y administradores.

## Cómo usar

1. Clona este repositorio en tu máquina local.
2. Abre el archivo `index.html` en un navegador web.
3. Inicia sesión con un usuario registrado y selecciona el rol correspondiente (Administrador, Médico o Paciente).
4. Los pacientes pueden agendar citas mediante el formulario disponible en su menú.
5. Los usuarios pueden cambiar su rol, si tienen permisos para hacerlo.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, por favor abre un issue o un pull request.

## Licencia

Este proyecto fue desarrollado por:

- Joan David Monroy Quintero (Código: 192374)
- Daniel Adolfo Amaya Rodríguez (Código: 192381)
