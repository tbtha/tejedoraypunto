
function mostrarFormulario(tipo) {
    const login = document.getElementById('form-login');
    const registro = document.getElementById('form-registro');
    if (tipo === 'login') {
        login.classList.remove('d-none');
        registro.classList.add('d-none');
    } else {
        registro.classList.remove('d-none');
        login.classList.add('d-none');
    }
}

// Validación de inicio de sesión
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            var email = document.getElementById('emailLogin').value.trim();
            var password = document.getElementById('passwordLogin').value;
            var emailError = document.getElementById('emailLoginError');
            var passError = document.getElementById('passwordLoginError');
            var valid = true;

            // Validar correo
            emailError.textContent = '';
            if (!email) {
                emailError.textContent = 'El correo es requerido.';
                valid = false;
            } else if (email.length > 100) {
                emailError.textContent = 'Máximo 100 caracteres.';
                valid = false;
            } else if (!/^([a-zA-Z0-9_.+-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(email)) {
                emailError.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
                valid = false;
            }

            // Validar contraseña
            passError.textContent = '';
            if (!password) {
                passError.textContent = 'La contraseña es requerida.';
                valid = false;
            } else if (password.length < 4 || password.length > 10) {
                passError.textContent = 'Debe tener entre 4 y 10 caracteres.';
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
            }
        });
    }
});