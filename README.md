# Mi Suite Playwright — QA Automation Roadmap

![Playwright Tests](https://github.com/Hroyero/mi-suite-playwright/actions/workflows/playwright.yml/badge.svg)

Suite de automatización construida con Playwright + TypeScript siguiendo estándares profesionales.

## Stack
- Playwright 1.38
- TypeScript
- GitHub Actions CI/CD

## Estructura
```
tests/          → specs organizados por funcionalidad
src/pages/      → Page Objects
src/fixtures/   → Fixtures reutilizables
src/data/       → Test data centralizado
```

## Correr los tests
```bash
npm install
npx playwright install chromium firefox
npx playwright test
```