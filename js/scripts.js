// Base de datos "quemada" - usuarios predefinidos en el código
const users = [
    {
        username: "Joan Monroy",
        email: "monroy@gmail.com", 
        password: "contraseña123",
        roles: [
            { name: "Médico", description: "Gestiona citas y pacientes.", icon: "👨‍⚕️"},
            { name: "Administrador", description: "Administra la plataforma.", icon: "🛠️" }
        ]
    },
    {
        username: "Daniel Amaya",
        email: "amaya@gmail.com", 
        password: "contraseña123",
        roles: [
            { name: "Médico", description: "Gestiona citas y pacientes.", icon: "👨‍⚕️"},
        ]
    },
    {
        username: "Martha Sanchez", 
        email: "sanchez@gmail.com",
        password: "contraseña123",
        roles: [
            { name: "Paciente", description: "Solicita citas y ve su historial médico.", icon: "👤"}
        ] 
    }
];

// Manejo del formulario de inicio de sesión
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    
    const email = document.getElementById("email").value; // Captura el email ingresado
    const password = document.getElementById("password").value; // Captura la contraseña ingresada
    
    // Busca un usuario que coincida con el email y la contraseña ingresados
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Si el usuario es válido, muestra la selección de roles
        document.getElementById("login-form").style.display = "none"; // Oculta el formulario de inicio de sesión
        document.getElementById("role-selection").style.display = "block"; // Muestra la sección de selección de rol
        
        // Muestra solo los roles definidos para el usuario
        const rolesContainer = document.getElementById("roles");
        rolesContainer.innerHTML = ''; // Limpia cualquier contenido previo en el contenedor de roles
        user.roles.forEach(role => { // Itera sobre los roles del usuario
            const roleCard = document.createElement("div"); // Crea un contenedor para cada rol
            roleCard.classList.add("role-card");
            roleCard.innerHTML = `
                <div class="role-icon">${role.icon}</div>
                <h3>${role.name}</h3>
                <p>${role.description}</p>
            `;

            // Evento de clic para seleccionar el rol y redirigir a otra página
            roleCard.addEventListener("click", function() {
                setUserRoleInStorage(role.name, user.username); // Guarda el rol seleccionado y el nombre del usuario
                window.location.href = "../html/roll.html"; // Redirige a la página de rol
            });

            rolesContainer.appendChild(roleCard); // Agrega la tarjeta de rol al contenedor de roles
        });
    } else {
        // Mensaje de error si las credenciales no son correctas
        alert("Correo o contraseña incorrectos.");
    }
});

// Función para almacenar el rol de usuario y nombre de usuario en localStorage
function setUserRoleInStorage(roleName, username) {
    localStorage.setItem('userRole', roleName); // Guarda el rol actual en localStorage
    localStorage.setItem('userName', username); // Guarda el nombre del usuario en localStorage
    
    // Encuentra al usuario en la base de datos simulada y guarda todos sus roles en localStorage
    const user = users.find(u => u.username === username);
    localStorage.setItem('userRoles', JSON.stringify(user.roles.map(r => r.name))); // Guarda los nombres de los roles en formato JSON
}