# Playwright Automation Suite

![Playwright Tests](https://github.com/Hroyero/mi-suite-playwright/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)

Suite de automatización E2E construida con Playwright + TypeScript.

## Arquitectura

```
src/
├── pages/          → Page Objects (POM)
├── fixtures/       → Fixtures reutilizables
└── data/           → Test data centralizado

tests/
├── api/            → API Testing
├── todomvc/        → UI Testing (desktop + mobile)
└── saucedemo/      → E2E Testing (flujo completo)
```

##  Cobertura de tests

| Suite | Tests | Browsers |
|-------|-------|----------|
| API Testing | 8 | Sin browser |
| TodoMVC UI | 11 | Chrome + Firefox + Mobile |
| SauceDemo E2E | 8 | Chrome |
| **Total** | **38** | **4 proyectos** |

##  Stack tecnológico

- **Playwright** — Framework de automatización
- **TypeScript** — Tipado estático
- **GitHub Actions** — CI/CD pipeline
- **Docker** — Contenedorización
- **axe-core** — Accesibilidad (preparado)

##  Patrones implementados

-  Page Object Model (POM)
-  Fixtures personalizadas
-  Test data centralizado
-  API Testing integrado
-  Multi-browser y mobile
-  Paralelismo (54% más rápido)
-  CI/CD automatizado

##  Correr los tests

```bash
# Instalar dependencias
npm install
npx playwright install chromium firefox

# Todos los tests
npx playwright test

# Por suite
npx playwright test --project=api
npx playwright test --project=saucedemo
npx playwright test --project=chromium
npx playwright test --project=mobile

# Ver reporte
npx playwright show-report
```

##  CI/CD

Cada push a `main` ejecuta automáticamente:
1. Instala dependencias
2. Instala browsers de Playwright
3. Corre los 38 tests en paralelo
4. Genera y sube el reporte HTML como artifact

##  Resultados

```
38 tests passing
4 workers en paralelo
~18s tiempo total
0 flaky tests
```