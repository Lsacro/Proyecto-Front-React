# FlatFinder Lado del Cliente (React)

## Introducción

Nombre de la aplicación: FlatFinder

## Caso de Estudio

El proyecto anterior era difícil de mantener debido a la funcionalidad repetitiva y las limitaciones de JavaScript. Con la habilidad de React para dividir tareas en componentes y distribuir el trabajo entre los programadores de manera eficiente, se decidió hacer la transición a React para facilitar el mantenimiento del código y la escalabilidad futura Tienes la tarea de desarrollar el próximo sistema en React, en parejas.

## Objetivos

Se espera que el proyecto haga que el estudiante obtenga confianza en las siguientes habilidades:
• Desarrollar el lado del cliente en React.
• Consumir REST API.
• Trabajar en equipo.

## Marcos de trabajo

• Buscador.
• Responsivo: Desktop, Tabletas, y teléfonos inteligentes.

## Tecnologías

• UI: HTML, CSS, JavaScript, React
• Servidor de base de datos: Firebase

## Habilidades Blandas

El trayecto de este proyecto incluirá practicar y evolucionar las siguientes habilidades:

1. Habilidades de revisión de código y revisión del trabajo de compañeros: practicar la capacidad de revisar el código de otra persona de manera constructiva, enfocándose en identificar áreas de mejora y al mismo tiempo reconocer las fortalezas.
2. Habilidades para levantar banderas: aprender a levantar banderas de manera efectiva, abordando inquietudes sobre problemas técnicos o la integridad del proyecto de manera clara y concisa.
3. Comunicación con los líderes de equipo (tu tutor): desarrollar habilidades para comunicarse con los líderes de equipo, incluida la capacidad de transmitir complejidades técnicas en términos comprensibles y facilitar la alineación y la toma de decisiones.
4. Diplomacia y Retroalimentación: Cultivar diplomacia cuando proveemos retroalimentación en la revisión de código, fomentando una cultura de crítica constructiva y crecimiento mutuo dentro del equipo.
5. Transparencia y Colaboración: Entender la importancia de la transparencia y la colaboración dentro del equipo, asegurando que las preocupaciones se abordan abiertamente y contribuyendo a un entorno de proyecto cohesivo.
6. Resolución individual de problemas: mejorar las habilidades de resolución de problemas abordando de forma independiente los desafíos encontrados durante el proyecto, fomentando la resiliencia y la creatividad para encontrar soluciones.
7. Habilidades de autoaprendizaje: enfatizando la importancia del autoaprendizaje continuo para mantenerse actualizado con nuevas tecnologías y metodologías, permitiendo el crecimiento personal y profesional en el campo en constante evolución del desarrollo full-stack.

## Flujo del trabajo en equipo

Un equipo tiene dos miembros, y la división del trabajo está especificada en la sección de divisón del trabajo. En la fase final, el equipo va a integrar su trabajo para formar una aplicación web funcional.

## Modelo de Datos

### Entidades

#### User

Nombre - Tipo de datos
Email - String
Password - String
First Name - String
Last Name - String
Birth Date - Date

## Flat

Un “flat” es propiedad de un solo “user”.
Nombre - Tipo de datos
City - String
Street name - String
Street number - Number
Area size - Number
Has AC - Boolean
Year built - Number
Rent price - Number
Date available - Date

## Message

un “message” fue enviado de un solo “user” en el contexto de un “flat” único.
Nombre Tipo de datos
Creation Time Date
Content String

## Validación

### User

• Todos los campos son requeridos.
• Verificación de tipo de datos.
• Email debe ser formato email.
• Los dos nombres (first y last) deben tener por lo menos 2 caracteres.
• La edad derivada debe estar en el rango de 18-120.
• Password de tener al menos 6 caracteres.
• Password debe contener - Letras - Números - Un caracter que no sea ni letra ni número.

### Flat

• Todos los campos son requeridos.
• Verificación de tipo de datos.

### Message

• El contenido del mensaje no puede ser un string vacío.

## Páginas

New Flat
• Inputs para todas las propiedades del “flat” como se especifica en la sección de
entidades.
• Botón “Save”.
Si todos los inputs son válidos, entonces los datos deben ser guardados. Después de una
actualización exitosa, el usuario será redireccionado a su página de inicio.
