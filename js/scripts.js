// Base de datos "quemada"
const users = [
    {
        username: "doctor1",
        email: "doctor1@example.com", 
        password: "contraseña123",
        roles: [
            { name: "Médico", description: "Gestiona citas y pacientes.", icon: "👨‍⚕️", redirectUrl: "medico.html" },
            { name: "Administrador", description: "Administra la plataforma.", icon: "🛠️", redirectUrl: "admin.html" }
        ]
    },
    {
        username: "patient1", 
        email: "patient1@example.com",
        password: "contraseña123",
        roles: [
            { name: "Paciente", description: "Solicita citas y ve su historial médico.", icon: "👤", redirectUrl: "paciente.html" }
        ] 
    }
];

// Manejo del formulario de inicio de sesión
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Si el usuario es válido, muestra los roles
        document.getElementById("login-form").style.display = "none";
        document.getElementById("role-selection").style.display = "block";
        
        // Muestra solo los roles definidos
        const rolesContainer = document.getElementById("roles");
        rolesContainer.innerHTML = ''; // Limpiar contenido previo
        user.roles.forEach(role => {
            const roleCard = document.createElement("div");
            roleCard.classList.add("role-card");
            roleCard.innerHTML = `
                <div class="role-icon">${role.icon}</div>
                <h3>${role.name}</h3>
                <p>${role.description}</p>
            `;

            // Añadir evento de clic para redirigir
            roleCard.addEventListener("click", function() {
                window.location.href = role.redirectUrl; // Redirigir a la URL del rol
            });

            rolesContainer.appendChild(roleCard);
        });
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});
