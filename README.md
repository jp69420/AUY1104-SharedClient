# AUY1104-SharedClient

Repositorio cliente para AUY1104 — Ciclo de Vida del Software.
Contiene la API Express de ejemplo y los pipelines de CI/CD.

#  TechMarket: Orders Microservice

Este repositorio contiene el código fuente, manifiestos de infraestructura y automatizaciones (CI/CD) para el microservicio crítico **"Orders"** de TechMarket. La arquitectura está diseñada bajo los principios de alta disponibilidad, resiliencia y despliegue continuo (Zero Downtime).

##  Arquitectura e Infraestructura
* **Orquestación:** Kubernetes (K3s) aprovisionado sobre instancias Amazon EC2 (AWS).
* **CI/CD:** GitHub Actions orquestando el ciclo de vida de la aplicación.
* **Contenedores:** Empaquetado Dockerizado y gestionado a través de registros de contenedores seguros.

##  Integración y Entrega Continua (CI/CD)
El pipeline de despliegue erradica la intervención manual y estandariza los procesos mediante:
* **Plantillas Modulares (Reusable Workflows):** Se abstrajo la complejidad de Kubernetes separando la lógica de "Build" y "Deploy".
* **Inyección Dinámica:** Los manifiestos YAML y secretos del clúster (Kubeconfig) se inyectan en tiempo de ejecución. Esto permite desplegar en múltiples *namespaces* o entornos sin hardcodear variables ni modificar el código fuente.
* **Acciones Oficiales Externas:** Se utilizan Actions verificadas (ej. `actions/checkout@v4`, `azure/k8s-set-context@v3`) priorizando la seguridad, estabilidad y el mantenimiento a largo plazo frente a scripts personalizados.

##  Estrategia de Despliegue: Blue-Green Deployment
Dada la criticidad financiera y operativa del servicio "Orders", se implementó una estrategia **Blue-Green**. 
* **Decisión Técnica y de Negocio:** Aunque mantener dos entornos en paralelo incrementa temporalmente el costo de recursos en la nube de AWS, es la única estrategia que garantiza **Zero Downtime**.
* **Ejecución:** El tráfico de usuarios se mantiene en la versión estable (Blue) mientras la nueva versión (Green) se levanta en segundo plano. El balanceo de tráfico se realiza instantáneamente modificando los selectores del servicio mediante `kubectl patch`, previniendo colisiones de asignación de puertos (NodePorts) en el clúster.

##  Resiliencia y Auto-Healing (Tolerancia a Fallos)
El sistema está preparado para identificar escenarios de error (ej. contenedores en `CrashLoopBackOff`, errores de configuración o fallos de red) y ejecutar remediación automática:
1. **Health Check Estratégico:** Antes de aplicar el parche de tráfico hacia la versión "Green", el pipeline realiza un sondeo de estado con tiempos de espera rigurosos.
2. **Rollback Automático:** Si se detecta un fallo, un bloque condicional intercepta el error. El despliegue defectuoso se elimina automáticamente para limpiar el clúster y el servicio nunca deja de apuntar a la versión "Blue", protegiendo al usuario final.
3. **Optimización del MTTR:** Este mecanismo reactivo disminuye el Tiempo Medio de Recuperación (MTTR) a casi cero, evitando la intervención humana de emergencia y asegurando la continuidad del negocio.

##  Valor Agregado para el Negocio
La refactorización de esta arquitectura beneficia directamente a TechMarket logrando:
* **Mejor Time-to-Market:** Aceleración en la entrega de actualizaciones.
* **Reducción de Riesgos:** Despliegues seguros donde una mala actualización no significa una caída del sistema.
* **Alineación DevOps:** Menor fricción entre los equipos de desarrollo y operaciones al contar con flujos de trabajo estandarizados.

---
##  Contexto Académico y Legal
* **Declaración de uso de IA:** Se utilizó Inteligencia Artificial como herramienta de asistencia técnica para la depuración de comandos complejos en bash, solución de conflictos de red (TLS/NodePorts en K3s) y estructuración de la presente documentación técnica.
