// Función para almacenar el rol de usuario y nombre de usuario en localStorage
function setUserRoleInStorage(roleName, username) {
    localStorage.setItem('userRole', roleName); // Guarda el rol en el almacenamiento local
    localStorage.setItem('userName', username); // Guarda el nombre de usuario en el almacenamiento local
}

// Ejecutar el código cuando el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Definir los roles de usuario y sus opciones de menú
    const roles = [
        {
            name: 'Administrador',
            menuOptions: [
                { text: 'Inicio', href: 'roll.html', redirect: true },
                { text: 'Gestión de Usuarios', href: '#', content: 'Aquí puedes gestionar los usuarios.' },
                { text: 'Cambiar rol', href: '#', content: 'Cambiar el rol del usuario.' },
                { text: 'Cerrar Sesión', href: 'index.html', redirect: true }
            ]
        },
        {
            name: 'Médico',
            menuOptions: [
                { text: 'Inicio', href: 'roll.html', redirect: true },
                { text: 'Pacientes', href: '#', content: 'Aquí puedes ver a los pacientes.' },
                { text: 'Cambiar rol', href: '#', content: 'Cambiar el rol del usuario.' },
                { text: 'Cerrar Sesión', href: 'index.html', redirect: true }
            ]
        },
        {
            name: 'Paciente',
            menuOptions: [
                { text: 'Inicio', href: 'roll.html', redirect: true },
                { text: 'Agendar Cita', href: '#', content: 'Agende una cita aquí.' },
                { text: 'Cerrar Sesión', href: 'index.html', redirect: true }
            ]
        }
    ];

    // Recuperar datos almacenados de usuario y roles
    const userRole = localStorage.getItem('userRole'); // Obtiene el rol del usuario
    const username = localStorage.getItem('userName'); // Obtiene el nombre del usuario
    const userRoles = JSON.parse(localStorage.getItem('userRoles')) || []; // Obtiene roles disponibles del usuario

    // Obtener elementos del DOM
    const welcomeMessage = document.getElementById('welcome-message'); // Elemento para el mensaje de bienvenida
    const contentDisplay = document.getElementById('content-display'); // Elemento para mostrar contenido dinámico
    const nav = document.querySelector('nav'); // Elemento de navegación
    const scheduleAppointmentContainer = document.getElementById('schedule-appointment'); // Contenedor del formulario de citas

    // Si el rol de usuario y el nombre de usuario existen, se personaliza la interfaz
    if (userRole && username) {
        // Mensaje de bienvenida con el rol y nombre del usuario
        welcomeMessage.textContent = `Bienvenido, ${username}, (${userRole})`;

        // Busca el rol correspondiente en el array de roles
        const role = roles.find(r => r.name === userRole);
        if (role) {
            const ul = document.createElement('ul'); // Crear lista para el menú de navegación
            role.menuOptions.forEach(option => {
                if (option.text === 'Cambiar rol') {
                    // Verifica roles disponibles distintos al actual para cambio de rol
                    const availableRoles = userRoles.filter(r => r !== userRole);
                    
                    // Si hay roles disponibles, crear opción de "Cambiar rol"
                    if (availableRoles.length > 0) {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.textContent = option.text;
                        a.href = option.href;
                        a.addEventListener('click', function(e) {
                            e.preventDefault(); // Previene la acción por defecto

                            // Mostrar roles disponibles para cambio
                            contentDisplay.innerHTML = '<h3>Cambiar rol</h3>';
                            availableRoles.forEach(r => {
                                const roleCard = document.createElement("div");
                                roleCard.classList.add("role-card"); // Añadir estilo de tarjeta a cada rol
                                roleCard.innerHTML = `
                                    <div class="role-icon">🔄</div>
                                    <h3>${r}</h3>
                                    <p>Haga clic para cambiar a este rol.</p>
                                `;

                                // Evento para cambiar al rol seleccionado al hacer clic
                                roleCard.addEventListener("click", () => {
                                    setUserRoleInStorage(r, username); // Guarda el nuevo rol
                                    window.location.reload(); // Recarga la página para aplicar el cambio
                                });

                                contentDisplay.appendChild(roleCard); // Añadir tarjeta de rol al contenido
                            });
                        });
                        li.appendChild(a);
                        ul.appendChild(li);
                    }
                } else if (option.text === 'Agendar Cita' && userRole === 'Paciente') {
                    // Crear opción "Agendar Cita" para el rol Paciente
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = option.text;
                    a.href = option.href;
                    a.addEventListener('click', function(e) {
                        e.preventDefault();
                        showScheduleAppointmentForm(); // Muestra el formulario para agendar citas
                    });
                    li.appendChild(a);
                    ul.appendChild(li);
                } else {
                    // Para otras opciones, crea elementos del menú y define acciones según su configuración
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = option.text;
                    a.href = option.href;

                    if (option.redirect) {
                        // Redireccionar al hacer clic si la opción indica un redireccionamiento
                        a.addEventListener('click', function(e) {
                            e.preventDefault();
                            window.location.href = option.href;
                        });
                    } else {
                        // Muestra el contenido específico en `contentDisplay` para opciones sin redirección
                        a.addEventListener('click', function(e) {
                            e.preventDefault();
                            contentDisplay.textContent = option.content;
                        });
                    }
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            });
            nav.innerHTML = ''; // Limpia el contenido actual de la barra de navegación
            nav.appendChild(ul); // Añade el nuevo menú generado
        }
    }

    // Función para mostrar el formulario de agendar cita
    function showScheduleAppointmentForm() {
        scheduleAppointmentContainer.style.display = 'block'; // Muestra el contenedor del formulario
        contentDisplay.innerHTML = '';  // Limpia contenido previo
    }

    // Captura y maneja el envío del formulario de agendar cita
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Previene el envío tradicional del formulario

            // Obtiene valores del formulario
            const doctor = document.getElementById('doctor-select').value;
            const date = document.getElementById('appointment-date').value;
            const time = document.getElementById('appointment-time').value;
            const description = document.getElementById('appointment-description').value;

            // Alerta de confirmación de la cita agendada
            alert(`Cita agendada con ${doctor} el ${date} a las ${time}. Descripción: ${description}`);
            
            // Muestra mensaje de éxito y oculta el formulario
            contentDisplay.innerHTML = 'Cita agendada exitosamente.';
            scheduleAppointmentContainer.style.display = 'none';
        });
    }
});
