# Automatización Continua con GitHub Actions - Proyecto Demo

Este proyecto demuestra cómo implementar un flujo de CI/CD básico usando GitHub Actions para un proyecto Node.js con pruebas automatizadas

---

## Estructura del Proyecto

```text
actions-demo/
├── .github/
│   └── workflows/
│       └── node-ci.yml      # Workflow de GitHub Actions
├── node_modules/            # Dependencias instaladas
├── sum.js                   # Función simple para probar
├── sum.test.js              # Prueba unitaria con Jest
├── package.json             # Configuración del proyecto
├── package-lock.json        # Detalles de dependencias
└── README.md                # Documentación del proyecto
```

---

## Configuración Inicial

- Crear proyecto Node.js:

```bash
mkdir actions-demo && cd actions-demo
npm init -y
```

---

- Instalar Jest como dependencia de desarrollo:

```bash
npm install --save-dev jest
```

---

- Configurar script de pruebas en package.json:

```json
"scripts": {
  "test": "jest"
}
```

---

- Crear archivo sum.js:

```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

---

- Crear archivo sum.test.js:

```javascript
const sum = require('./sum');

test('Suma dos números', () => {
  expect(sum(1, 2)).toBe(3);
});
```

---

## Flujo de Trabajo de GitHub Actions

El archivo .github/workflows/node-ci.yml define nuestro pipeline:

```yaml
name: Node.js CI

on:
 push:
    branches: [ main ]
 pull_request:
    branches: [ main ]

jobs:
 build-and-test:
    runs-on: ubuntu-latest
 
    steps:
        - name: Clonar repositorio
          uses: actions/checkout@v3
 
        - name: Usar Node.js
          uses: actions/setup-node@v3
          with:
            node-version: '18'
 
        - name: Instalar dependencias
          run: npm install
 
        - name: Ejecutar pruebas
          run: npm test
```

---

## Ejecución del Workflow

Subir cambios al repositorio:

```bash
git add .
git commit -m "Prueba de CI"
git push origin main
```

---

## Verificar ejecución en GitHub

- Ir a la pestaña "Actions" en el repositorio
- Seleccionar el workflow "Node.js CI"
- Inspeccionar los resultados de cada paso

---

## Uso de Secrets

- Para proteger información sensible:

### Crear secretos en GitHub

- Settings → Secrets → Actions → New repository secret

### Usar secretos en el workflow

```yaml
- name: Ver entorno
  run: echo "Entorno actual: ${{ secrets.NODE_ENV }}"
```

---

## Ventajas de GitHub Actions

- ✅ Integración nativa con el ecosistema GitHub
- ✅ Configuración como código usando archivos YAML
- ✅ Ejecución paralela de jobs y escalabilidad automática
- ✅ Marketplace con miles de acciones reutilizables
- ✅ Sin mantenimiento de infraestructura (serverless)

---

## Mejoras Potenciales al Pipeline

### Despliegue Continuo (CD)

```yaml
- name: Desplegar en Vercel
  uses: amondnet/vercel-action@v30
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
  Control de Calidad:
    - name: Ejecutar ESLint
      run: npx eslint .

    - name: Ejecutar Prettier
      run: npx prettier --check .
  
  Seguridad Avanzada:
    - name: Auditoría de dependencias
      run: npm audit --audit-level=high

    - name: Escaneo de vulnerabilidades
      uses: snyk/actions/node@master
      with:
        args: test
```

---

## Consideraciones de Seguridad

- 🔒 Nunca hardcodear credenciales en el código
- 🔒 Usar GitHub Secrets para datos sensibles
- 🔒 Limitar permisos con permissions en el workflow:

```yaml
permissions:
  contents: read
  packages: write
```

- 🔒 Usar npm ci en lugar de npm install para builds confiables

---

## Preguntas Frecuentes

- ¿Cómo difiere GitHub Actions de Jenkins?
  - Configuración: Actions usa YAML (simple y versionado), Jenkins requiere Groovy
  - Arquitectura: Actions es serverless, Jenkins necesita servidores propios
  - Integración: Actions tiene soporte nativo para eventos de GitHub

- ¿Qué otras tareas podrían automatizarse?
  - Generación de documentación automática
  - Notificaciones en Slack/Email
  - Escaneo de código estático (SonarQube)
  - Pruebas de rendimiento (Lighthouse)
  - Actualización automática de dependencias (Dependabot)

## Contribución

- Haz un fork del proyecto
- Crea tu rama (git checkout -b feature/nueva-funcionalidad)
- Haz commit de tus cambios (git commit -am 'Añade nueva funcionalidad')
- Haz push a la rama (git push origin feature/nueva-funcionalidad)
- Abre un Pull Request
