const express = require('express');
const { estadoSalud, saludo, suma, eco } = require('./lib/ejemplo');

function createApp() {
  const app = express();
  app.use(express.json());

  // GET /health — estado del servicio
  app.get('/health', (req, res) => {
    res.json(estadoSalud());
  });

  // GET /api/saludo — saludo con nombre opcional
  app.get('/api/saludo', (req, res) => {
    const { nombre } = req.query;
    res.json(saludo(nombre));
  });

  // POST /api/echo — devuelve el body recibido
  app.post('/api/echo', (req, res) => {
    res.status(201).json(eco(req.body));
  });

  // Ruta no encontrada
  app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  return app;
}

// Solo levanta el servidor si se ejecuta directamente (no en tests)
if (require.main === module) {
  const app = createApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API escuchando en http://0.0.0.0:${PORT}`);
  });
}

module.exports = { createApp };
