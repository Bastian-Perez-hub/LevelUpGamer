const form = document.getElementById('register-form');
const formMessage = document.getElementById('form-message');

const camposRequeridos = ['nombre', 'apellido', 'fecha-nacimiento', 'email', 'telefono'];

function mostrarError(inputId, mensaje = 'Campo obligatorio') {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(`error-${inputId}`);
  input.classList.add('input-error');
  errorSpan.textContent = mensaje;
}

function limpiarError(inputId) {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(`error-${inputId}`);
  input.classList.remove('input-error');
  errorSpan.textContent = '';
}

function validarVacios() {
  let esValido = true;

  camposRequeridos.forEach((id) => {
    const valor = document.getElementById(id).value.trim();
    if (valor === '') {
      mostrarError(id);
      esValido = false;
    } else {
      limpiarError(id);
    }
  });

  return esValido;
}

function validarEmail() {
  const email = document.getElementById('email').value.trim();
  if (email === '') return true;

  const partes = email.split('@');

  if (partes.length !== 2 || partes[1] === '' || !partes[1].includes('.')) {
    mostrarError('email', 'Ingresa un email válido');
    return false;
  }

  limpiarError('email');
  return true;
}

function validarTelefono() {
  const telefono = document.getElementById('telefono').value.trim();
  if (telefono === '') return true;

  const sinEspacios = telefono.split(' ').join(''); // saca todos los espacios
  const partes = sinEspacios.split('+');

  const formatoValido =
    sinEspacios.length === 12 &&
    partes[0] === '' &&
    partes[1].startsWith('56');

  if (!formatoValido) {
    mostrarError('telefono', 'Formato: +56 9 1234 5678');
    return false;
  }

  limpiarError('telefono');
  return true;
}

function validarDominioDuoc() {
  const email = document.getElementById('email').value.trim();
  if (email === '') return;

  const dominio = email.split('@')[1];

  if (dominio === 'duocuc.cl') {
    formMessage.textContent = 'BIENVENIDO AMIGO DUOC! HAS GANADO UN 20% ADICIONAL, Te hemos enviado un correo de confirmacion.'; // reemplaza esto por el tuyo
    formMessage.style.color = 'var(--accent-green)';
  }
}

function validarEdad() {
  const fechaNacimiento = document.getElementById('fecha-nacimiento').value;

  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();

  const noHaCumplidoAniosEsteAnio =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());

  if (noHaCumplidoAniosEsteAnio) {
    edad--;
  }

  if (edad < 18) {
    mostrarError('fecha-nacimiento', 'Debes ser mayor de 18 años');
    return false;
  }

  limpiarError('fecha-nacimiento');
  return true;
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const vacíosOk = validarVacios();
  const emailOk = validarEmail();
  const telefonoOk = validarTelefono();
  const edadOk = validarEdad();

  const esValido = vacíosOk && emailOk && telefonoOk && edadOk;

  if (esValido) {
    validarDominioDuoc();

    if (formMessage.textContent === '') {
      formMessage.textContent = '¡Genial! Te hemos enviado un correo de confirmacion';
      formMessage.style.color = 'var(--accent-green)';
    }
  } else {
    formMessage.textContent = 'Por favor corrige los errores.';
    formMessage.style.color = '#ff5c5c';
  }
});


camposRequeridos.forEach((id) => {
  document.getElementById(id).addEventListener('input', () => {
    if (document.getElementById(id).value.trim() !== '') {
      limpiarError(id);
    }
  });
});