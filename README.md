# AlgoVisus

[![KN Algo](https://img.shields.io/badge/Made%20by-KN%20Algo-000424?style=flat-square&logo=cplusplus)](https://algo.pwr.edu.pl/)
[![PWr](https://img.shields.io/badge/Affiliation-PWr-red?style=flat-square)](https://pwr.edu.pl/)
[![License](https://img.shields.io/badge/License-GPLv3-purple?style=flat-square)](./LICENSE)
[![Status](https://img.shields.io/badge/Status-Development-orange?style=flat-square)]()

> Aplikacja do dbania o Twój wzrok stworzona we współpracy z KN Visus! 

## 📋 O projekcie

Tutaj opisz szczegółowo cel projektu.
* **Problem:** Jaki problem rozwiązujecie?
* **Rozwiązanie:** Jakie podejście zastosowaliście?
* **Cel:** Czy to projekt na konkurs, pracę dyplomową, hackathon, czy grant rektora?

Jeśli projekt opiera się na konkretnej publikacji naukowej, warto ją tutaj zacytować.

### 🚀 Funkcjonalności
* [ ] Funkcjonalność 1
* [ ] Funkcjonalność 2
* [ ] Wizualizacja wyników

## 🛠 Technologie

Wymień główne języki i biblioteki.

* **Język:** Python 3.9 / C++17 / Java
* **Biblioteki:** NumPy, Pandas, SFML, OpenCV
* **Narzędzia:** Docker, CMake

## 💻 Jak uruchomić (Getting Started)

Instrukcja krok po kroku, jak uruchomić projekt lokalnie.

### Wymagania wstępne
Co użytkownik musi mieć zainstalowane?
* `python >= 3.8`
* `gcc`

### Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone [https://github.com/KN-Algo/nazwa-projektu.git](https://github.com/KN-Algo/nazwa-projektu.git)
   ```

2.  Zainstaluj zależności:
    ```bash
    pip install -r requirements.txt
    # lub
    npm install
    ```

### Uruchomienie

Przykładowe komenda do uruchomienia głównego skryptu:

```bash
python main.py --input data/input.txt
```

## 🧠 Teoria i Algorytmy (Opcjonalne)

Jeśli projekt jest algorytmiczny, opisz:

  * Zastosowane algorytmy.
  * Złożoność obliczeniową (np. $`O(n \log n)`$).
  * Strukturę danych.

Możesz dodać pseudokod lub diagramy.

## 📊 Przykładowe wyniki

Jeden obraz znaczy więcej niż 1000 słów. Wstaw tutaj zrzut ekranu aplikacji, wykres wydajności lub GIF z działania algorytmu.

## 🤝 Twórcy

Projekt realizowany przez członków **KN Algo** przy Politechnice Wrocławskiej:

  * **[Imię Nazwisko](https://www.google.com/search?q=link_do_githuba)** - Rola (np. Lead Developer)
  * **[Imię Nazwisko](https://www.google.com/search?q=link_do_githuba)** - Rola (np. Research, Documentation)

-----

<div align="center">
Stworzone z ❤️ przez <a href="https://algo.pwr.edu.pl/">KN Algo</a> | Politechnika Wrocławska
</div>


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
