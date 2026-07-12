# AUY1104-SharedClient

Repositorio cliente para AUY1104 — Ciclo de Vida del Software.
Contiene la API Express de ejemplo y los pipelines de CI/CD.

Operación Resiliencia: TechMarket - Microservicio Orders

1. Declaraciones Formales
Declaración de uso de IA: El desarrollo de los scripts de automatización, resolución de conflictos de red (certificados TLS y asignación de NodePorts) y estructuración de la documentación técnica, contaron con la asistencia de Inteligencia Artificial como herramienta de consulta para la depuración operativa.

Referencias Bibliográficas:

Amazon Web Services. (2024). Documentación oficial de arquitectura en Amazon EC2 y EKS.

Kubernetes. (2024). Documentación oficial: Services, Deployments y Patching.

GitHub. (2024). Referencia de sintaxis para flujos de trabajo de GitHub Actions.

2. Arquitectura de la Solución (Infraestructura y CI/CD)
Descripción del Entorno
El microservicio crítico "Orders" se ejecuta dentro de un clúster de Kubernetes (K3s) aprovisionado sobre infraestructura de Amazon Web Services (EC2). Este entorno asegura el aislamiento de los procesos y alta disponibilidad de los contenedores.

Integración y Entrega Continua (CI/CD)
El ciclo de despliegue ha sido automatizado mediante GitHub Actions para erradicar procesos manuales y riesgos asociados al factor humano:

Plantillas Reutilizables y Parametrización: Se implementaron Workflows modulares para el empaquetado (construcción de imágenes Docker) y despliegue (aplicación de manifiestos K8s). La inyección dinámica de secretos (credenciales Kubeconfig) y variables de entorno permite que el mismo código despliegue en múltiples entornos sin requerir alteraciones en la base de código.

Integración de Componentes Externos: El pipeline utiliza Actions oficiales y verificadas (ej. actions/checkout@v4, azure/k8s-set-context@v3). Esta decisión se justifica bajo estrictos criterios de seguridad y mantenibilidad, evitando vulnerabilidades presentes en scripts de ejecución manual o dependencias obsoletas de terceros.

3. Estrategia de Despliegue Avanzada: Blue-Green
Justificación Técnica y de Negocio
Frente a la criticidad de las operaciones de TechMarket, se implementó la estrategia Blue-Green Deployment. Analizando el balance entre costo operativo y disponibilidad, esta estrategia asume un incremento temporal en el consumo de recursos de infraestructura (al mantener dos entornos simultáneos) a cambio de garantizar Zero Downtime (cero caídas de servicio) y una experiencia de usuario ininterrumpida.

Implementación Operativa en Kubernetes

El pipeline orquesta el despliegue de los nuevos contenedores (Green) en paralelo a los contenedores de producción (Blue).

El enrutamiento de red de Kubernetes (Service) mantiene el flujo de usuarios en el entorno estable.

Se aplica un reemplazo en caliente mediante la instrucción kubectl patch. Este método modifica la etiqueta de enrutamiento al instante sin destruir el recurso de red subyacente, evitando colisiones de asignación de puertos (NodePort).

4. Ingeniería del Caos y Remediación Automática (Auto-Healing)
Detección de Fallos y Lógica de Rollback
El sistema incorpora mecanismos de remediación temprana diseñados para reaccionar ante contingencias operativas (ej. estados de CrashLoopBackOff o latencias críticas):

Validación de Salud (Health Check): Previo al desvío de tráfico, el pipeline sondea obligatoriamente el estado del despliegue (Green) utilizando tiempos de espera estrictos.

Reversión Condicional (Rollback): Ante cualquier código de salida fallido en la validación, el flujo condicional intercepta el error. El cambio de tráfico se aborta, manteniendo a los usuarios en la versión estable original. Posteriormente, el sistema ejecuta la limpieza automática del entorno defectuoso.

Impacto en la Continuidad Operativa
Este diseño minimiza el Tiempo Medio de Recuperación (MTTR). Al remover la necesidad de intervención manual para aislar un fallo y restaurar la operación, se protegen directamente los ingresos del negocio y se asegura la resiliencia sistémica.

5. Alineación Estratégica
La refactorización del pipeline representa una mejora demostrable para los objetivos de TechMarket:

Agilidad Organizacional: La automatización reduce los tiempos de entrega (Time-to-Market), acelerando la liberación de valor hacia los clientes.

Fiabilidad y Calidad: La estandarización mediante manifiestos YAML y plantillas previene configuraciones erráticas (hardcoding).

Mitigación de Riesgos: El ecosistema de despliegue permite la innovación continua y asume la posible inyección de errores en producción sin que esto resulte en caídas del servicio final.