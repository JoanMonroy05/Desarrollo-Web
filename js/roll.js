// roll.js

document.addEventListener('DOMContentLoaded', function() {
    // Leer el rol guardado en localStorage
    const userRole = localStorage.getItem('userRole');

    // Mostrar el mensaje de bienvenida personalizado
    const welcomeMessage = document.getElementById('welcome-message');
    const roleDescription = document.getElementById('role-description');

    if (userRole) {
        welcomeMessage.textContent = `Bienvenido, ${userRole}`;
        // Encontrar el rol correspondiente en la lista de usuarios
        const user = users.find(u => u.roles.some(role => role.name === userRole));
        if (user) {
            const role = user.roles.find(role => role.name === userRole);
            roleDescription.innerHTML = `
                <h2>${role.name}</h2>
                <p>${role.description}</p>
            `;
        }
    } else {
        welcomeMessage.textContent = "Bienvenido, invitado";
        roleDescription.textContent = "Por favor, inicie sesión para ver su rol.";
    }
});
