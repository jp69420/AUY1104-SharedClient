// Lógica pura separada de las rutas Express
// Esto permite testear sin levantar el servidor

function estadoSalud() {
  return { status: 'ok', mensaje: 'API funcionando correctamente' };
}

function saludo(nombre) {
  if (nombre) {
    return { mensaje: `Hola, ${nombre}! Bienvenido a AUY1104` };
  }
  return { mensaje: 'Hola! Bienvenido a AUY1104' };
}

function suma(a, b) {
  return { resultado: a + b };
}

function eco(body) {
  return body;
}

module.exports = { estadoSalud, saludo, suma, eco };
