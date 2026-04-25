# AUY1104-SharedClient

Repositorio cliente para AUY1104 — Ciclo de Vida del Software.
Contiene la API Express de ejemplo y los pipelines de CI/CD.

## Pipelines

| Workflow | Disparador | Qué hace |
|---|---|---|
| `ci-tests.yaml` | push en rama ≠ main | Instala dependencias y corre tests. Sin Docker. |
| `client.yaml` | push de tag `v*.*.*` | Llama a SharedWorkflows: tests + build + push a Docker Hub |

## Configurar secretos (obligatorio para el pipeline de release)

1. Ve a **Settings → Secrets and variables → Actions**
2. Crea estos dos secretos:
   - `DOCKER_USERNAME` → tu usuario de Docker Hub
   - `DOCKER_PASSWORD` → tu Access Token de Docker Hub

## Correr tests localmente

```bash
npm install
npm test
```

## Construir y probar la imagen Docker localmente

```bash
docker build -t demo-api:local .
docker run --rm -p 3000:3000 demo-api:local
```

Luego en otra terminal:
```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/saludo?nombre=Duoc
curl -X POST http://localhost:3000/api/echo \
  -H "Content-Type: application/json" \
  -d '{"curso":"AUY1104"}'
```

## Publicar una versión (disparar el pipeline de release)

```bash
git tag v1.0.0
git push origin v1.0.0
```
