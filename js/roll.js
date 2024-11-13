function setUserRoleInStorage(roleName, username) {
    localStorage.setItem('userRole', roleName);
    localStorage.setItem('userName', username);
}

document.addEventListener('DOMContentLoaded', function() {
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

    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('userName');
    const userRoles = JSON.parse(localStorage.getItem('userRoles')) || [];

    const welcomeMessage = document.getElementById('welcome-message');
    const contentDisplay = document.getElementById('content-display');
    const nav = document.querySelector('nav');
    const scheduleAppointmentContainer = document.getElementById('schedule-appointment');

    if (userRole && username) {
        welcomeMessage.textContent = `Bienvenido, ${username}, (${userRole})`;

        const role = roles.find(r => r.name === userRole);
        if (role) {
            const ul = document.createElement('ul');
            role.menuOptions.forEach(option => {
                if (option.text === 'Cambiar rol') {
                    const availableRoles = userRoles.filter(r => r !== userRole);
                    
                    if (availableRoles.length > 0) {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.textContent = option.text;
                        a.href = option.href;
                        a.addEventListener('click', function(e) {
                            e.preventDefault();

                            contentDisplay.innerHTML = '<h3>Cambiar rol</h3>';
                            availableRoles.forEach(r => {
                                const roleCard = document.createElement("div");
                                roleCard.classList.add("role-card");
                                roleCard.innerHTML = `
                                    <div class="role-icon">🔄</div>
                                    <h3>${r}</h3>
                                    <p>Haga clic para cambiar a este rol.</p>
                                `;

                                roleCard.addEventListener("click", () => {
                                    setUserRoleInStorage(r, username);
                                    window.location.reload();
                                });

                                contentDisplay.appendChild(roleCard);
                            });
                        });
                        li.appendChild(a);
                        ul.appendChild(li);
                    }
                } else if (option.text === 'Agendar Cita' && userRole === 'Paciente') {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = option.text;
                    a.href = option.href;
                    a.addEventListener('click', function(e) {
                        e.preventDefault();
                        showScheduleAppointmentForm();
                    });
                    li.appendChild(a);
                    ul.appendChild(li);
                } else {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = option.text;
                    a.href = option.href;

                    if (option.redirect) {
                        a.addEventListener('click', function(e) {
                            e.preventDefault();
                            window.location.href = option.href;
                        });
                    } else {
                        a.addEventListener('click', function(e) {
                            e.preventDefault();
                            contentDisplay.textContent = option.content;
                        });
                    }
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            });
            nav.innerHTML = '';
            nav.appendChild(ul);
        }
    }

    function showScheduleAppointmentForm() {
        // Mostrar el formulario de agendar cita
        scheduleAppointmentContainer.style.display = 'block';
        contentDisplay.innerHTML = '';  // Limpiar cualquier contenido previo
    }

    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const doctor = document.getElementById('doctor-select').value;
            const date = document.getElementById('appointment-date').value;
            const time = document.getElementById('appointment-time').value;
            const description = document.getElementById('appointment-description').value;

            alert(`Cita agendada con ${doctor} el ${date} a las ${time}. Descripción: ${description}`);
            
            // Mostrar un mensaje de confirmación o redirigir
            contentDisplay.innerHTML = 'Cita agendada exitosamente.';
            scheduleAppointmentContainer.style.display = 'none';  // Ocultar el formulario
        });
    }
});
