const { estadoSalud, saludo, suma, eco } = require('../src/lib/ejemplo');

describe('estadoSalud()', () => {
  test('retorna status ok', () => {
    const result = estadoSalud();
    expect(result.status).toBe('ok');
  });

  test('retorna un mensaje', () => {
    const result = estadoSalud();
    expect(result.mensaje).toBeDefined();
  });
});

describe('saludo()', () => {
  test('saludo sin nombre', () => {
    const result = saludo();
    expect(result.mensaje).toContain('Hola');
  });

  test('saludo con nombre incluye el nombre', () => {
    const result = saludo('Ana');
    expect(result.mensaje).toContain('Ana');
  });
});

describe('suma()', () => {
  test('suma dos números positivos', () => {
    expect(suma(2, 3).resultado).toBe(5);
  });

  test('suma con cero', () => {
    expect(suma(0, 5).resultado).toBe(5);
  });

  test('suma negativos', () => {
    expect(suma(-1, 1).resultado).toBe(0);
  });
});

describe('eco()', () => {
  test('retorna el mismo objeto recibido', () => {
    const body = { curso: 'AUY1104', modulo: 'Docker' };
    expect(eco(body)).toEqual(body);
  });
});
